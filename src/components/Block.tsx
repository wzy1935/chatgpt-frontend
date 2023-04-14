import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Block({ text }) {

  return (<div className='hover:bg-neutral-100 p-4 border-b'>
    <div className='prose w-full mx-auto'>
      <ReactMarkdown>
        {text}
      </ReactMarkdown>
    </div>
  </div>
  )
}