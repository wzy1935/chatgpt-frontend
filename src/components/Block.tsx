import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Block({ role, content }) {

  return (<div className={`hover:bg-neutral-50 p-4 border-b ${role === 'user' ? ' bg-neutral-100': ' bg-white'}`}>
    <div className='prose w-full mx-auto'>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  </div>
  )
}