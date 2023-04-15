import { useState } from 'react'
import SideBar from './components/SideBar'
import Block from './components/Block'
import History from './components/History'
import chat from './api/chat'
import { test } from './stores/store'
import { useSelector, useDispatch } from 'react-redux'



function App() {
  const dispatch = useDispatch()

  return (
    <div className=' h-screen w-screen bg-neutral-50 flex'>
      <div className=' w-64 h-full'>
        <SideBar
          chatList={[{ key: 0, title: '12' }, { key: 1, title: '34' }]}
          chosen={0}
          onChange={() => {}}
        ></SideBar>
      </div>
      <div className=' w-full'>
        <History messages={[]}></History>
      </div>
      <button onClick={() => {dispatch(test(5))}}>test {useSelector(s => s.main.current)}</button>

    </div>
  )
}

export default App
