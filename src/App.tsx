import { useState } from 'react'
import SideBar from './components/SideBar'
import Block from './components/Block'
import History from './components/History'
import StartPage from './components/StartPage'
import InputField from './components/InputField'
import Live from './components/Live'
import ScrollToBottom from 'react-scroll-to-bottom'

import chat from './api/chat'
import { store } from './stores/store'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  let mainPage = null
  let current = useSelector(s => s.main.current)
  let messages = useSelector(s => current === null ? null : s.main.sessions[current].messages)
  let chatList = useSelector(s => s.main.sessions.map(item => item.name))

  if (current === null) {
    mainPage = (<StartPage />)
  } else {
    mainPage = (<div>
      <History messages={messages}></History>
      <Live></Live>
      <div className=' w-full h-48'></div>
    </div>
    )
  }

  return (
    <div className=' h-screen w-screen bg-neutral-50 flex'>
      <div className=' w-64 h-full hidden'>
        <SideBar
          chatList={chatList}
          chosen={current}
          onChange={(index) => { dispatch(store.setSession({ id: index })) }}
        ></SideBar>
      </div>
      <div className=' w-full relative h-full'>
        <ScrollToBottom className='overflow-y-auto h-full ' scrollViewClassName='scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-neutral-300 scrollbar-thin'>
          {mainPage}
        </ScrollToBottom>
        <div className=' w-full absolute bottom-0'>
          <InputField />
        </div>
      </div>
    </div>
  )
}

export default App
