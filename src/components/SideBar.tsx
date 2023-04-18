import { useState } from 'react'
import hash from 'object-hash'
import { ReactComponent as PlusSvg } from '../assets/plus.svg'
import { ReactComponent as SettingsSvg } from '../assets/settings.svg'
import { ReactComponent as MessageSvg } from '../assets/message-square.svg'
import { ReactComponent as DataSvg } from '../assets/database.svg'

export default function SideBar({ chosen, chatList, onChange, onBtn }) {
  const chatListNode = chatList.map((v, k) => (
    <button
      key={hash([v, k])}
      className={` px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 ${k === chosen ? 'bg-gray-700' : ''} `}
      onClick={() => {
        onChange(k)
      }}
    >
      {v}
    </button>
  ))

  return (<div className=' bg-gray-900 w-full h-full text-white p-2 flex text-sm flex-col justify-between'>
    <div className=' flex flex-col space-y-2'>
      <button
        className='px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 border border-gray-600 flex items-center'
        onClick={() => onChange(null)}
      >
        <MessageSvg className='h-4 w-4 mr-4' />
        New chat
      </button>
      {chatListNode}
    </div>
    <div className=' flex flex-col space-y-2'>
      <hr className=' border-gray-600' />
      <button
        className='px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 flex items-center'
        onClick={() => onBtn('settings')}
      ><SettingsSvg className='h-4 w-4 mr-4' />Settings</button>
            <button
        className='px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 flex items-center'
        onClick={() => onBtn('data')}
      ><DataSvg className='h-4 w-4 mr-4' />Local data</button>
    </div>
  </div>)
}


