import Block from './Block'
import hash from 'object-hash'

export default function History({messages}) {
  
  return (<div className=' w-full'>
    {messages.map(item => {
      return <Block content={item.content} role={item.role} key={hash(item)}></Block>
    })}
  </div>)
}