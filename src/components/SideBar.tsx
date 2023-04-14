import { useState } from 'react'


export default function SideBar({ chosen, chatList, onChange }) {
  function btnClick(id) {
    if (chosen !== id) onChange(id)
  }


  const chatListNode = chatList.map(item => (
    <button
      key={item.key}
      className={` px-4 py-2 w-full text-left hover:bg-neutral-800 ${item.key === chosen ? 'bg-neutral-700' : ''} `}
      onClick={() => btnClick(item.key)}
    >
      {item.title}
    </button>
  ))

  return (<div className=' bg-neutral-900 w-full h-full text-white'>
    <div className=' px-4 py-6'>Chat List</div>
    <div className='flex flex-col w-full'>
      {chatListNode}
    </div>
  </div>)
}


