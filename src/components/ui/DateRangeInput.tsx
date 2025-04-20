'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { format, isSameDay, isAfter, isBefore } from 'date-fns'

export interface DateRange {
  from: Date | null
  to: Date | null
}

interface CalendarDay {
  dayOfMonth: number
  date: Date
  isCurrentMonth: boolean
}

interface DateRangeInputProps {
  value: DateRange
  onChange: (range: DateRange) => void
  placeholder?: string
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(value.from ?? new Date())
  const [selectedRange, setSelectedRange] = useState<DateRange>(value)

  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedRange(value)
    if (value.from && !isOpen) {
      setCurrentDisplayMonth(value.from)
    }
  }, [value, isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleCancel()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, selectedRange])

  const [currentDate, setCurrentDate] = useState(new Date())

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const firstDayOfWeek = firstDayOfMonth.getDay()

    const calendarDays = []
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    // Add leading days from the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = daysInPreviousMonth - firstDayOfWeek + 1 + i
      calendarDays.push({
        dayOfMonth: day,
        date: new Date(year, month - 1, day),
        isCurrentMonth: false
      })
    }

    // add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        dayOfMonth: i,
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }

    // add trailing days from next month
    const remainingDays = calendarDays.length > 35 ? 42 - calendarDays.length : 35 - calendarDays.length
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        dayOfMonth: i,
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    return calendarDays
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSelectedRange(value)
      setCurrentDisplayMonth(value.from ?? new Date())
    }
  }

  const handleDayClick = (day: CalendarDay) => {
    const clickedDate = day.date // Already normalized by generateCalendarDays

    setSelectedRange(prevRange => {
      const { from, to } = prevRange

      if (!from || (from && to)) {
        return { from: clickedDate, to: null }
      } else {
        if (isBefore(clickedDate, from)) {
          return { from: clickedDate, to: null }
        } else {
          return { from: from, to: clickedDate }
        }
      }
    })
  }

  const handleApply = () => {
    let finalFrom = selectedRange.from
    let finalTo = selectedRange.to

    if (finalFrom && finalTo && isAfter(finalFrom, finalTo)) {
      // Swap if 'from' is after 'to'
      ;[finalFrom, finalTo] = [finalTo, finalFrom]
    }

    onChange({ from: finalFrom, to: finalTo })
    setIsOpen(false)
  }

  const handleCancel = useCallback(() => {
    setSelectedRange(value)
    setIsOpen(false)
  }, [value, setSelectedRange, setIsOpen])

  const calendarDays = useMemo(() => generateCalendarDays(currentDisplayMonth), [currentDisplayMonth])
  const currentMonthYear = useMemo(() => format(currentDisplayMonth, 'MMMM yyyy'), [currentDisplayMonth])
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const displayRangeString = useMemo(() => {
    const { from, to } = value
    if (!from) return placeholder
    const fromStr = format(from, 'PP')
    const toStr = to ? format(to, 'PP') : null
    return toStr && fromStr !== toStr ? `${fromStr} - ${toStr}` : fromStr
  }, [value, placeholder])

  const getDayState = (dayDate: Date) => {
    const { from, to } = selectedRange
    const isSelectedFrom = from && isSameDay(dayDate, from)
    const isSelectedTo = to && isSameDay(dayDate, to)
    const isInRange = from && to && isAfter(dayDate, from) && isBefore(dayDate, to)
    const isSelected = isSelectedFrom || isSelectedTo
    return { isSelectedFrom, isSelectedTo, isInRange, isSelected }
  }

  return (
    <div>
      <div
        ref={triggerRef}
        role='button'
        className='icon-button bg-gray-100 cursor-pointer text-[18px] rounded-[8px] relative inline-flex items-center justify-center overflow-hidden h-10 p-2.5 text-center transition-all duration-300 border-none c-pointer select-none text-6 text-no-wrap text-no-underline v-popper--has-tooltip'
        onClick={togglePanel}
      >
        <span className='icon-button__icon material-icons mr-2 text-base' aria-hidden='true'>
          calendar_month
        </span>
        <span className='truncate text-sm'>{displayRangeString}</span>
      </div>
      {isOpen && (
        <div
          ref={panelRef}
          className='calendar-panel absolute z-10 mt-2 w-auto min-w-[300px] bg-white border border-gray-200 rounded-md shadow-lg p-4'
        >
          <div className='calendar-header flex items-center justify-between mb-3'>
            <button
              onClick={handlePrevMonth}
              className='p-1 rounded hover:bg-gray-100 text-gray-600 cursor-pointer'
              aria-label='Previous month'
            >
              <span className='material-icons text-lg'>chevron_left</span>
            </button>
            <h2 className='font-semibold text-sm text-gray-800'>{currentMonthYear}</h2>
            <button
              onClick={handleNextMonth}
              className='p-1 rounded hover:bg-gray-100 text-gray-600 cursor-pointer'
              aria-label='Next month'
            >
              <span className='material-icons text-lg'>chevron_right</span>
            </button>
          </div>

          <div className='days-of-week grid grid-cols-7 gap-x-1 text-center text-xs font-medium text-gray-500 mb-2'>
            {daysOfWeek.map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className='calendar-grid grid grid-cols-7 gap-1'>
            {calendarDays.map(day => {
              const { isSelectedFrom, isSelectedTo, isInRange, isSelected } = getDayState(day.date)
              const dayClasses = [
                'day-cell',
                'flex items-center justify-center h-8 w-8 rounded text-sm cursor-pointer',
                day.isCurrentMonth ? 'text-gray-700' : 'text-gray-400',
                day.isCurrentMonth ? 'hover:bg-gray-100' : 'pointer-events-none',
                isSelected ? 'bg-blue-500 text-white font-semibold hover:bg-blue-600' : '',
                isSelectedFrom ? 'rounded-l-full' : '',
                isSelectedTo ? 'rounded-r-full' : '',
                isInRange ? 'bg-blue-100 text-blue-800 rounded-none hover:bg-blue-200' : '',
                isSelectedFrom && isSelectedTo ? 'rounded-full' : ''
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div
                  key={day.date.toISOString()}
                  onClick={() => day.isCurrentMonth && handleDayClick(day)}
                  className={dayClasses}
                  role='button'
                  aria-pressed={isSelected} // Indicate selection state
                  aria-label={format(day.date, 'PPP')} // e.g., Aug 15th, 2024
                >
                  {day.dayOfMonth}
                </div>
              )
            })}
          </div>
          <div className='calendar-footer flex justify-end gap-2 border-t border-gray-200 pt-3 mt-3'>
            <button
              onClick={handleCancel}
              className='px-3 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className='px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              disabled={!selectedRange.from}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateRangeInput
