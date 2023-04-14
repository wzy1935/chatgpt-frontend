import { useState } from 'react'
import SideBar from './components/SideBar'
import Block from './components/Block'


function App() {
  let [session, setSession] = useState(0)
  function changeSession(id) {
    setSession(id)
  }

  const markdown = 'A paragraph with *emphasis* and **strong importance**. Will `this` work?'


  return (
    <div className=' h-screen w-screen bg-neutral-50 flex'>
      <div className=' w-64 h-full'>
        <SideBar
          chatList={[{ key: 0, title: '12' }, { key: 1, title: '34' }]}
          chosen={session}
          onChange={changeSession}
        ></SideBar>
      </div>
      <div className=' w-full'>
        <Block text={markdown}></Block>

      </div>


    </div>
  )
}

export default App
