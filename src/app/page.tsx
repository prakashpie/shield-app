'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/ui/Header'
import type { ColumnDefinition } from '@/components/ui/Table'
import Table from '@/components/ui/Table'
import DateRangeInput, { DateRange } from '@/components/ui/DateRangeInput'
import { endOfDay, startOfDay, subDays } from 'date-fns'
import '@/styles/style.css'

interface UserData {
  name: string
  title: string
  email: string
  role: string
  registrationDate: string
}

const sampleUsers: UserData[] = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    registrationDate: '2025-03-15'
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
    registrationDate: '2025-01-20'
  },
  {
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member',
    registrationDate: '2025-01-05'
  },
  {
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin',
    registrationDate: '2025-04-10'
  },
  {
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner',
    registrationDate: '2025-04-12'
  },
  {
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member',
    registrationDate: '2024-08-12'
  }
]

const fetchUsersByDateRange = async (range: DateRange | undefined): Promise<UserData[]> => {
  await new Promise(resolve => setTimeout(resolve, 400))

  if (!range?.from) {
    return []
  }

  const fromDate = startOfDay(range.from)
  const toDate = endOfDay(range.to ?? range.from)

  return sampleUsers.filter(user => {
    try {
      const userRegDate = new Date(user.registrationDate + 'T00:00:00Z')
      return userRegDate >= fromDate && userRegDate <= toDate
    } catch (e) {
      return e
    }
  })
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayedUsers, setDisplayedUsers] = useState<UserData[]>([])

  const [selectedRange, setSelectedRange] = useState<DateRange>(() => {
    const defaultEndDate = startOfDay(new Date())
    const defaultStartDate = startOfDay(subDays(defaultEndDate, 6))
    return { from: defaultStartDate, to: defaultEndDate }
  })

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const users = await fetchUsersByDateRange(selectedRange)
        setDisplayedUsers(users)
      } catch (err) {
        setError('Failed to load data. Please try again.')
        setDisplayedUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedRange])

  const userColumns: ColumnDefinition[] = [
    {
      key: 'name',
      header: 'Full Name',
      cell: user => <span className={'text-gray-900 font-semibold'}>{user.name}</span>,
      sortable: true
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true
    },
    {
      key: 'email',
      header: 'Email Address',
      cell: user => <a href={`mailto:${user.email}`}>{user.email}</a>
    },
    {
      key: 'isActive',
      header: 'Status'
    },
    {
      key: 'registrationDate',
      header: 'Registered On',
      cell: user => new Date(user.registrationDate).toLocaleDateString()
    }
  ]

  return (
    <div id='__next' className='flex min-h-screen w-full flex-col shrink-0 bg-[#f5f5f5]'>
      <Header></Header>
      <div className={'position-relative flex-1'}>
        <div className={'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:my-6 lg:my-8'}>
          <div className='data-table w-full flex flex-col text-3.5 rounded-3 border-solid border-1 border-gray-100'>
            {error && !isLoading && (
              <div className='p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-md'>{error}</div>
            )}
            {!isLoading && !error && (
              <Table
                className={'py-4 shrink-0 bg-white border-1 border-gray-100'}
                columns={userColumns}
                data={isLoading ? [] : displayedUsers}
                initialSortKey={'name'}
                caption={'Data Table'}
              >
                <DateRangeInput value={selectedRange} onChange={setSelectedRange} placeholder={'Select Registration Dates'} timezone={'Asia/Calcutta'} maxPastDays={90}/>
              </Table>
            )}
            {isLoading && <div className='p-4 text-center text-gray-500'>Loading data...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
