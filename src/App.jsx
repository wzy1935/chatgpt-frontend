import { useEffect, useState } from 'react'
import { withErrorBoundary, useErrorBoundary } from 'react-use-error-boundary'
import SideBar from './components/SideBar'
import History from './components/History'
import StartPage from './components/StartPage'
import InputField from './components/InputField'
import Live from './components/Live'
import Settings from './components/Settings'
import DataConfig from './components/DataConfig'
import ScrollToBottom from 'react-scroll-to-bottom'

import { store } from './stores/store'
import { useSelector, useDispatch } from 'react-redux'

function AppInside() {
  const dispatch = useDispatch()
  const [mask, setMask] = useState(null)

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('data'))
    if (s !== null) {
      dispatch(store.loadState({
        savedState: s
      }))
      dispatch(store.saveState())
    }
  }, [])

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
  let dataPage = (<DataConfig
    onClose={() => setMask(null)}
  />)


  function sideBarOnBtn(eventStr) {
    if (eventStr === 'settings') {
      setMask(settingsPage)
    } else if (eventStr === 'data') {
      setMask(dataPage)
    }
  }

  return (
    <div className=' h-screen w-screen bg-gray-50 flex text-gray-900'>
      <div className=' w-80 h-full'>
        <SideBar
          chatList={chatList}
          chosen={current}
          onChange={(index) => { dispatch(store.setSession({ id: index })) }}
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



const App = withErrorBoundary(() => {
  const [error, resetError] = useErrorBoundary()
  const dispatch = useDispatch()

  function errorHandling() {
    dispatch(store.resetState())
    dispatch(store.saveState())
    resetError()
  }

  function copy() {
    navigator.clipboard.writeText(localStorage.getItem('data'))
  }

  if (error) {
    return (
      <div className=' h-screen w-screen bg-gray-50 flex text-gray-900 items-center justify-center'>
        <div className=' rounded-md w-full flex space-y-6 flex-col max-w-xl bg-white p-6'>
          <h1 className=' text-xl font-bold'>Oops</h1>
          <p className=' p-2 bg-red-50 rounded-md text-sm text-red-400'>{error.message}</p>
          <p>An error was generated due to unexpected reason. It could be caused by modifying local data illegally. Try refresh. If it keeps happening, click the button to reset the whole session:</p>
          <div>
          <p className='text-xs text-red-600 pb-2'>Warning: It will also clear your local data</p>
            <button className='bg-red-600 hover:bg-red-500 text-white p-1 px-2 rounded-md mr-2' onClick={errorHandling}>Reset</button>
            <button className='bg-gray-50 hover:bg-gray-100 p-1 px-2 rounded-md ' onClick={copy}>Copy local data to clipboard</button>
          </div>
        </div>
      </div>
    );
  }

  return <AppInside />;
})

export default App
