import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ReactComponent as AISvg } from '../assets/gpt.svg'
import { ReactComponent as UserSvg } from '../assets/user.svg'

export default function Block({ role, content }) {

  return (<div className={` p-6 border-b ${role === 'user' ? ' bg-white' : ' bg-gray-100'}`}>
    <div className=' flex justify-center '>
      <div className=' h-8 w-8 mr-6'>
        {role === 'user' ?
          <UserSvg className='  bg-[#5b6bbe] p-2 rounded-sm text-white h-full w-full'></UserSvg> :
          <AISvg className='  bg-[#10a37f] p-1 rounded-sm text-white h-full w-full'></AISvg>}
      </div>
      <div className='prose w-full'>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={materialOceanic}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>
    </div>

  </div>
  )
}