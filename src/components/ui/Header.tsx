import React from 'react'
import Link from 'next/link'

type HeaderProps = object

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={'z-9 border-b-1 border-solid border-gray-200 flex-0 bg-white'}>
      <div className={'px-4 py-2 md:py-3 w-full flex items-center'}>
        <Link href='/' className='text-5 font-bold px-4' title='Shield'>
          Shield
        </Link>
        <span className={'flex-1'}></span>
        <div className='flex flex-shrink-0'>
          <a className='flex px-2 items-center h-12'>
            <div className='md:flex hidden flex-col align-items-end mr-4'>
              <p className='text-4 mb-0'>Prakash Bharti</p>
            </div>
            <div className='bg-gray-300 w-10 h-10 font-bold flex items-center justify-center text-5 rounded-full'>
              P
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
