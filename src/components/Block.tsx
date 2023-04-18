import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactComponent as AISvg } from '../assets/gpt.svg'
import { ReactComponent as UserSvg } from '../assets/arrow.svg'

export default function Block({ role, content }) {

  return (<div className={` p-6 border-b ${role === 'user' ? ' bg-white' : ' bg-neutral-100'}`}>
    <div className=' flex justify-center '>
      <div className=' h-8 w-8 mr-6'>
        {role === 'user' ?
        <UserSvg className='  bg-[#5b6bbe] p-2 rounded-sm fill-white h-full w-full'></UserSvg>:
        <AISvg className='  bg-[#10a37f] p-1 rounded-sm text-white h-full w-full'></AISvg>}
      </div>
      <div className='prose w-full'>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>

  </div>
  )
}