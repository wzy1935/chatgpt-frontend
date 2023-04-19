import { useEffect, useState, useRef } from 'react'
import hash from 'object-hash'
import { store } from '../stores/store'
import { ReactComponent as PlusSvg } from '../assets/plus.svg'
import { ReactComponent as SettingsSvg } from '../assets/settings.svg'
import { ReactComponent as MessageSvg } from '../assets/message-square.svg'
import { ReactComponent as DataSvg } from '../assets/database.svg'
import { ReactComponent as XSvg } from '../assets/x.svg'
import { ReactComponent as CheckSvg } from '../assets/check.svg'
import { ReactComponent as EditSvg } from '../assets/edit.svg'
import { ReactComponent as TrashSvg } from '../assets/trash-2.svg'
import { useDispatch } from 'react-redux'


function SideBarItem({ title, chosen, onRename, onRemove, onClick }) {
  const [editing, setEditing] = useState(null)
  const [removing, setRemoving] = useState(false)
  const inputRef = useRef(null)
  useEffect(() => {
    if (!chosen) {
      setEditing(null)
      setRemoving(false)
    }
    if (editing !== null) {
      inputRef.current.focus()
    }
  })

  function confirm() {
    if ((editing !== null) && !removing) {
      onRename(editing)
      setEditing(null)
    } else if ((editing === null) && removing) {
      onRemove()
      setRemoving(false)
    }
  }

  function stopPropagation(func) {
    return (e) => {
      e.stopPropagation()
      func(e)
    }
  }

  let endNode = (<div></div>)
  if (chosen) {
    if ((editing !== null) || removing) {
      endNode = (<div className=' flex items-center'>
        <CheckSvg className='h-4 w-4 cursor-pointer hover:bg-gray-700' onClick={stopPropagation(confirm)} />
        <XSvg className='h-4 w-4 ml-2 cursor-pointer hover:bg-gray-700' onClick={stopPropagation(() => removing ? setRemoving(false) : setEditing(null))} />
      </div>)
    } else {
      endNode = (<div className=' flex items-center'>
        <EditSvg className='h-4 w-4 cursor-pointer hover:bg-gray-700' onClick={stopPropagation(() => setEditing(title))} />
        <TrashSvg className='h-4 w-4 ml-2 cursor-pointer hover:bg-gray-700' onClick={stopPropagation(() => setRemoving(true))} />
      </div>)
    }
  }

  return (<button
    className={` flex items-center justify-between px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 ${chosen ? 'bg-gray-700' : ''} `}
    onClick={onClick}
  >
    <div className=' flex items-center '>
      {editing !== null
        ? <EditSvg className='h-4 w-4 mr-4' />
        : removing
          ? <TrashSvg className='h-4 w-4 mr-4' />
          : <MessageSvg className='h-4 w-4 mr-4' />}
      <div className='truncate w-32'>
        {editing !== null
          ? <input
            ref={inputRef}
            type="text"
            className=' w-32 bg-white bg-opacity-20 focus:outline-1 focus:outline-gray-300'
            value={editing}
            onChange={(e) => setEditing(e.target.value)} />
          : title}
      </div>
    </div>
    {endNode}
  </button>)
}


export default function SideBar({ chosen, chatList, onChange, onBtn }) {
  const dispatch = useDispatch()

  const chatListNode = chatList.map((v, k) => (
    <SideBarItem
      title={v}
      key={hash([v, k])}
      chosen={chosen === k}
      onClick={() => onChange(k)}
      onRemove={() => dispatch(store.removeSession({ id: k }))}
      onRename={(name) => dispatch(store.renameSession({ id: k, name: name }))}
    />
  ))

  return (<div className=' bg-gray-900 w-full h-full text-white p-2 flex text-sm flex-col justify-between items-stretch'>
    <div className=' flex flex-col space-y-2'>
      <button
        className='px-4 py-3 w-full rounded-md text-left hover:bg-gray-800 border border-gray-600 flex items-center'
        onClick={() => onChange(null)}
      >
        <PlusSvg className='h-4 w-4 mr-4' />
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


