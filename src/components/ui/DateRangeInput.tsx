'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { subDays, isBefore, isSameDay, isAfter, startOfDay as dateFnsStartOfDay } from 'date-fns'
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz'

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
  timezone: string
  placeholder?: string
  maxPastDays?: number
}

const getStartOfDayInTimezone = (date: Date | null | undefined, timezone: string): Date | null => {
  if (!date) return null
  const dateString = formatInTimeZone(date, timezone, 'yyyy-MM-dd')
  return fromZonedTime(dateString, timezone)
}

const getEndOfDayInTimezone = (date: Date | null | undefined, timezone: string): Date | null => {
  if (!date) return null
  const startOfDayUTC = getStartOfDayInTimezone(date, timezone)
  if (!startOfDayUTC) return null
  const endOfDayString = formatInTimeZone(startOfDayUTC, timezone, 'yyyy-MM-dd') + 'T23:59:59.999'
  return fromZonedTime(endOfDayString, timezone)
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  value,
  onChange,
  timezone,
  maxPastDays = -1,
  placeholder = 'Select date range'
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const getInitialDisplayMonth = () => {
    if (value.from) {
      return toZonedTime(value.from, timezone)
    }
    return toZonedTime(new Date(), timezone)
  }

  const checkMaxPastDays = useCallback((dateLocal: Date): boolean => {
    // check date if it older than maxPastDays
    if (maxPastDays == -1) {
      return false
    }

    const nowInTimezone = toZonedTime(new Date(), timezone)
    const startOfTodayUTC = getStartOfDayInTimezone(nowInTimezone, timezone)

    if (!startOfTodayUTC) {
      console.error('Could not determine the start of today in the specified timezone.')
      return false
    }

    const limitDateUTC = subDays(startOfTodayUTC, maxPastDays)

    const inputDateUTC = getStartOfDayInTimezone(dateLocal, timezone)

    if (!inputDateUTC) {
      console.error('Could not determine the input date in the specified timezone.')
      return false
    }

    return isBefore(inputDateUTC, limitDateUTC)
  }, [maxPastDays, timezone])

  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(getInitialDisplayMonth)
  const [selectedRange, setSelectedRange] = useState<DateRange>(() => ({
    from: getStartOfDayInTimezone(value.from, timezone),
    to: getStartOfDayInTimezone(value.to, timezone) // Store start of day for 'to' internally for simplicity
  }))

  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newSelectedRange = {
      from: getStartOfDayInTimezone(value.from, timezone),
      to: getStartOfDayInTimezone(value.to, timezone)
    }
    setSelectedRange(newSelectedRange)

    if (value.from && !isOpen) {
      setCurrentDisplayMonth(toZonedTime(value.from, timezone))
    } else if (!value.from && !isOpen) {
      setCurrentDisplayMonth(toZonedTime(new Date(), timezone))
    }
  }, [value, timezone, isOpen])

  const handleCancel = useCallback(() => {
    setSelectedRange({
      from: getStartOfDayInTimezone(value.from, timezone),
      to: getStartOfDayInTimezone(value.to, timezone)
    })
    setIsOpen(false)
  }, [value, timezone, setSelectedRange, setIsOpen])

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
  }, [isOpen, handleCancel])

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
        date: dateFnsStartOfDay(new Date(year, month - 1, day)),
        isCurrentMonth: false,
        isDisabled: checkMaxPastDays(dateFnsStartOfDay(new Date(year, month - 1, day)))
      })
    }

    // add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        dayOfMonth: i,
        date: dateFnsStartOfDay(new Date(year, month, i)),
        isCurrentMonth: true,
        isDisabled: checkMaxPastDays(dateFnsStartOfDay(new Date(year, month, i)))
      })
    }

    // add trailing days from next month
    const totalDays = calendarDays.length
    const remainingDays = totalDays <= 35 ? 42 - totalDays : totalDays <= 42 ? 42 - totalDays : 0
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        dayOfMonth: i,
        // Store date as start of day in local TZ for now
        date: dateFnsStartOfDay(new Date(year, month + 1, i)),
        isCurrentMonth: false,
        isDisabled: checkMaxPastDays(dateFnsStartOfDay(new Date(year, month + 1, i)))
      })
    }
    return calendarDays
  }

  const handleNextMonth = () => {
    setCurrentDisplayMonth(prev => {
      const zonedPrev = toZonedTime(prev, timezone) // Ensure we work with zoned time
      return new Date(zonedPrev.getFullYear(), zonedPrev.getMonth() + 1, 1)
    })
  }

  const handlePrevMonth = () => {
    setCurrentDisplayMonth(prev => {
      const zonedPrev = toZonedTime(prev, timezone) // Ensure we work with zoned time
      return new Date(zonedPrev.getFullYear(), zonedPrev.getMonth() - 1, 1)
    })
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setSelectedRange({
        from: getStartOfDayInTimezone(value.from, timezone),
        to: getStartOfDayInTimezone(value.to, timezone)
      })
      setCurrentDisplayMonth(getInitialDisplayMonth())
    }
  }

  const handleDayClick = (day: CalendarDay) => {
    const clickedDateUTC = getStartOfDayInTimezone(day.date, timezone)
    if (!clickedDateUTC) return // Should not happen if day.date is valid

    setSelectedRange(prevRange => {
      const { from, to } = prevRange

      if (!from || (from && to)) {
        return { from: clickedDateUTC, to: null }
      } else {
        if (isBefore(clickedDateUTC, from)) {
          return { from: clickedDateUTC, to: null }
        } else {
          return { from: from, to: clickedDateUTC }
        }
      }
    })
  }

  const handleApply = () => {
    let finalFromUTC = selectedRange.from
    let finalToUTC = selectedRange.to

    if (finalFromUTC && finalToUTC && isAfter(finalFromUTC, finalToUTC)) {
      ;[finalFromUTC, finalToUTC] = [finalToUTC, finalFromUTC]
    }

    const finalEndToUTC = getEndOfDayInTimezone(finalToUTC, timezone)

    onChange({ from: finalFromUTC, to: finalEndToUTC })
    setIsOpen(false)
  }

  const calendarDays = useMemo(() => generateCalendarDays(currentDisplayMonth), [currentDisplayMonth])
  const currentMonthYear = useMemo(
    () => formatInTimeZone(currentDisplayMonth, timezone, 'MMMM yyyy'),
    [currentDisplayMonth, timezone]
  )
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const displayRangeString = useMemo(() => {
    const { from, to } = value
    if (!from) return placeholder
    const fromStr = formatInTimeZone(from, timezone, 'PP')
    const toStr = to ? formatInTimeZone(to, timezone, 'PP') : null
    const fromDayStr = formatInTimeZone(from, timezone, 'yyyy-MM-dd')
    const toDayStr = to ? formatInTimeZone(to, timezone, 'yyyy-MM-dd') : null
    return toStr && fromDayStr !== toDayStr ? `${fromStr} - ${toStr}` : fromStr
  }, [value, timezone, placeholder])

  const getDayState = (dayDateLocal: Date) => {
    const dayDateUTC = getStartOfDayInTimezone(dayDateLocal, timezone)
    if (!dayDateUTC) return { isSelectedFrom: false, isSelectedTo: false, isInRange: false, isSelected: false }

    const { from, to } = selectedRange // These are already start of day in TZ (as UTC)

    const isSelectedFrom = from && isSameDay(dayDateUTC, from)
    const isSelectedTo = to && isSameDay(dayDateUTC, to)
    const isInRange = from && to && isAfter(dayDateUTC, from) && isBefore(dayDateUTC, to)
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
        <span className='truncate text-sm'>
          {displayRangeString} - {timezone}
        </span>
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
                isSelectedFrom && isSelectedTo ? 'rounded-full' : '',
                day.isDisabled ? 'pointer-events-none disabled op-70' : ''
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div
                  key={day.date.toISOString()} // Use ISO string for key
                  onClick={() => day.isCurrentMonth && handleDayClick(day)}
                  className={dayClasses}
                  role='button'
                  aria-disabled={day.isDisabled}
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
