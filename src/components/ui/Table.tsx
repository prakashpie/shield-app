import React, { useEffect, useMemo, useState } from 'react'

export interface ColumnDefinition {
  key: string
  header: React.ReactNode
  cell?: (item: Record<string, any>) => React.ReactNode
  sortable?: boolean
}

export interface TableProps {
  columns: ColumnDefinition[]
  data: Record<string, any>[]
  className?: string
  caption?: string
  getRowKey?: (item: Record<string, any>) => React.Key
  initialSortKey?: string | undefined
  initialSortDirection?: 'ascending' | 'descending'
  children?: React.ReactNode | undefined
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  className,
  caption,
  getRowKey,
  initialSortKey,
  initialSortDirection = 'ascending',
  children
}) => {
  const [sortKey, setSortKey] = useState<string | undefined>(initialSortKey)
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | null>(initialSortDirection)

  const [searchColumnKey, setSearchColumnKey] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>('')

  // set initial search column

  useEffect(() => {
    if (columns.length > 0 && !searchColumnKey) {
      setSearchColumnKey(columns[0].key)
    }
    if (columns.length === 0) {
      setSearchColumnKey('')
    }
  }, [columns, searchColumnKey])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(preDirection => (preDirection === 'ascending' ? 'descending' : 'ascending'))
    } else {
      setSortKey(key)
      setSortDirection(initialSortDirection)
    }
  }

  const handleSearchColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchColumnKey(event.target.value)
  }

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setActiveSearchTerm(searchTerm)
    }
  }

  const handleClearSearchTerm = () => {
    setActiveSearchTerm('')
    setSearchTerm('')
  }

  const sortedData = useMemo(() => {
    let filteredData = [...data]

    if (activeSearchTerm && searchColumnKey) {
      const lowerCaseSearchTerm = activeSearchTerm.toLowerCase()
      filteredData = filteredData.filter(item => {
        const value = item[searchColumnKey]
        if (value === null || value === undefined) {
          return false
        }
        return String(value).toLowerCase().includes(lowerCaseSearchTerm)
      })
    }

    if (!sortKey || !sortDirection) {
      return filteredData
    }

    filteredData.sort((a, b) => {
      const valueA = a[sortKey]
      const valueB = b[sortKey]

      let comparison = 0

      if (valueA === null && valueB !== null) {
        comparison = 1
      } else if (valueA !== null && valueB === null) {
        comparison = -1
      } else if (valueB === null && valueA === null) {
        comparison = 0
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB
      } else {
        comparison = valueA.localeCompare(valueB)
      }
      return sortDirection === 'ascending' ? comparison : comparison * -1
    })

    return filteredData
  }, [data, sortKey, sortDirection, searchColumnKey, activeSearchTerm])

  const getCellValue = (item: Record<string, any>, column: ColumnDefinition): React.ReactNode => {
    if (column.cell) {
      return column.cell(item)
    }

    const value = item[column.key]
    if (value === null || value === undefined) {
      return ''
    }
    // todo add some user defined function to set value
    if (typeof value === 'object') {
      return '[Object]'
    }
    return String(value)
  }

  return (
    <div className='data-table w-full flex flex-col overflow-x-auto text-3.5 bg-white rounded-3 overflow-hidden border-solid border-1 border-gray-100'>
      <div className='h-14 flex relative pl-6 pr-4 items-center'>
        <div className='flex-1 relative w-full h-10' style={{ maxWidth: '420px' }}>
          <div className='absolute top-0 left-0 w-full h-full'>{caption}</div>
        </div>
        <div className='flex-1'></div>
        {children}
        <div className='shrink-0 flex pl-6'>
          <div className={'input-group inline-flex items-center'}>
            <div className='max-w-sm mx-auto'>
              <select
                value={searchColumnKey}
                onChange={handleSearchColumnChange}
                className='bg-gray-100  outline-none border-nonetext-gray-900 text-sm rounded-tl-4 rounded-bl-4 rounded-br-none rounded-tr-none text-[14px] focus:ring-blue-500 focus:border-blue-500  h-10 w-full p-2.5'
              >
                {columns.length === 0 && <option value=''>No columns</option>}
                {columns.map(col => (
                  <option key={col.key} value={col.key}>
                    {typeof col.header === 'string' ? col.header : col.key}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={`flex relative flex-col text-field--interactive ${activeSearchTerm ? 'text-field--interactive-on' : ''}`}
            >
              <div
                className={`${activeSearchTerm ? 'pointer-events-none' : ''} text-field relative outline-none border-none bg-gray-100 rounded-4 text-[14px] inline-flex justify-center w-full duration-300 transition-all overflow-visible text-field--with-leading-icon text-field--disabled-float-above h-10`}
              >
                <input
                  autoComplete='off'
                  placeholder='Type and enter to search'
                  name='search'
                  type='text'
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  onKeyDown={handleSearchKeyDown}
                  className='text-field__input appearance-none bg-transparent outline-none font-inherit text-inherit border-none flex self-end m-0 px-4 duration-300 transition-all w-full h-full py-1'
                />
              </div>
              {activeSearchTerm.length > 0 && (
                <div className={'absolute z-1 top-0 left-0 w-full h-full px-4 py-1 flex items-center'}>
                  <div className={'bg-gray-300 rounded-[16px] px-2 py-1 inline-flex items-center'}>
                    <div
                      className={
                        'chip select-none mr-2 text-[14px] min-w-[64px] max-w-[100px] text-nowrap overflow-hidden'
                      }
                    >
                      {activeSearchTerm}
                    </div>
                    <button
                      style={{ marginRight: '-2px' }}
                      type='button'
                      className='icon-button bg-gray-200 cursor-pointer text-[18px] rounded-full relative inline-flex items-center justify-center overflow-hidden h-6 w-6 p-0 text-center transition-all duration-300 border-none c-pointer select-none text-6 text-no-wrap text-no-underline v-popper--has-tooltip'
                      onClick={handleClearSearchTerm}
                    >
                      <span className='icon-button__icon material-icons' style={{ fontSize: '18px' }}>
                        close
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <table className={`${className} data-table__table w-full text-[14px]`} role='table' aria-colcount={data.length}>
        <thead role='rowgroup'>
          <tr role='row' className='data-table__header-row'>
            {columns.map((column, index) => {
              const isSortable = column.sortable
              const isCurrentSortKey = column.key === sortKey
              return (
                <th
                  key={`header-${String(column.key)}-${index}`}
                  className={`${isSortable ? 'cursor-pointer' : ''} data-table__header-cell overflow-hidden font-semibold text-left px-8 py-2 text-gray-900`}
                  role='col'
                  onClick={() => {
                    return isSortable ? handleSort(column.key) : ''
                  }}
                >
                  <div className={'flex items-center'}>
                    {column.header}
                    {isSortable && (
                      <span
                        className={
                          'material-icons ml-2 select-none inline-flex w-5 h-5 items-center justify-center overflow-hidden'
                        }
                        style={{ fontSize: 18 }}
                      >
                        {isCurrentSortKey
                          ? sortDirection !== 'ascending'
                            ? 'arrow_upward'
                            : 'arrow_downward'
                          : initialSortDirection !== 'ascending'
                            ? 'arrow_upward'
                            : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody role='rowgroup'>
          {sortedData.map((item, rowIndex) => {
            const rowKey = getRowKey ? getRowKey(item) : `row-${rowIndex}`
            return (
              <tr
                key={rowKey}
                className='data-table__row border-surface-variant transition-all duration-300 position-relative border-t-1 border-solid'
                role='row'
              >
                {columns.map((column, colIndex) => {
                  return (
                    <td
                      key={`cell-${rowKey}-${String(column.key)}-${colIndex}`}
                      className='data-table__cell overflow-hidden text-left px-8 py-4 text-gray-500'
                      role='cell'
                    >
                      {getCellValue(item, column)}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                <div className={'border-1 border-solid border-gray-100 flex items-center justify-center h-[320px]'}>
                  There is no rows yet.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
