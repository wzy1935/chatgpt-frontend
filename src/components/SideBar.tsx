import { useState } from 'react'
import hash from 'object-hash'

export default function SideBar({ chosen, chatList, onChange }) {

  const chatListNode = chatList.map((v, k) => (
    <button
      key={hash([v, k])}
      className={` px-4 py-2 w-full text-left hover:bg-neutral-800 ${k === chosen ? 'bg-neutral-700' : ''} `}
      onClick={() => {
        onChange(k)
      }}
    >
      {v}
    </button>
  ))

  return (<div className=' bg-neutral-900 w-full h-full text-white'>
    <div className=' px-4 py-6'>Chat List</div>
    <div className='flex flex-col w-full'>
      {chatListNode}
    </div>
  </div>)
}


