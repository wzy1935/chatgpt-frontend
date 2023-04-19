import { useState } from 'react'
import SideBar from './components/SideBar'
import Block from './components/Block'
import History from './components/History'
import StartPage from './components/StartPage'
import InputField from './components/InputField'
import Live from './components/Live'
import Settings from './components/Settings'
import ScrollToBottom from 'react-scroll-to-bottom'

import chat from './api/chat'
import { store } from './stores/store'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const [mask, setMask] = useState(null)

  let mainPage = null
  let current = useSelector(s => s.main.current)
  let messages = useSelector(s => current === null ? null : s.main.sessions[current].messages)
  let chatList = useSelector(s => s.main.sessions.map(item => item.name))

  if (current === null) {
    mainPage = (<div className='h-full w-full'>
      <StartPage />
    </div>)
  } else {
    mainPage = (<div>
      <History messages={messages}></History>
      <Live></Live>
      <div className=' w-full h-48'></div>
    </div>
    )
  }

  let settingsPage = (<Settings
    onClose={() => setMask(null)}
  />)


  function sideBarOnBtn(eventStr) {
    if (eventStr === 'settings') {
      setMask(settingsPage)
    }
  }

  return (
    <div className=' h-screen w-screen bg-gray-50 flex text-gray-900'>
      <div className=' w-80 h-full'>
        <SideBar
          chatList={chatList}
          chosen={current}
          onChange={(index) => {dispatch(store.setSession({ id: index })) }}
          onBtn={sideBarOnBtn}
        ></SideBar>
      </div>
      <div className=' w-full relative h-full'>
        <ScrollToBottom
          className='overflow-hidden h-full '
          scrollViewClassName='scrollbar scrollbar-thumb-rounded-md scrollbar-thumb-gray-300 scrollbar-thin'
        >
          {mainPage}
        </ScrollToBottom>
        <div className=' w-full absolute bottom-0'>
          <InputField />
        </div>
      </div>

      {/* mask layer */}
      {mask !== null && (
        <div className=' absolute h-full w-full'>
          <div className='absolute bg-gray-500 h-full w-full opacity-50' />
          <div className='absolute h-full w-full flex justify-center items-center'>
            {mask}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
