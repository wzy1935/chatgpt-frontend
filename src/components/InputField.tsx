import { store } from '../stores/store'
import { useSelector, useDispatch } from 'react-redux'
import chat, { initChatPromise } from '../api/chat'
import { ReactComponent as SendSvg } from '../assets/send.svg'

export default function InputField() {
  let text = useSelector(s => s.main.live.inp)
  let settings = useSelector(s => s.main.settings)
  let current = useSelector(s => s.main.current)
  let msg = useSelector(s => s.main.current === null ? [] : JSON.parse(JSON.stringify(s.main.sessions[s.main.current].messages)))
  let dispatch = useDispatch()

  function ask() {
    if (text === null || text.trim() === '') {
      return
    }
    if (current === null) {
      dispatch(store.newSession({messages: []}))
    }
    let uuid = crypto.randomUUID()
    dispatch(store.submitUserLive({id: uuid}))
    msg.push({ "role": "user", "content": text })
    chat(msg, settings, (newStr, code) => {
      if (code === 'RUNNING') {
        dispatch(store.updateAssistantLive({ id: uuid, content: newStr }))
      } else {
        dispatch(store.saveLive({id: uuid, discard: code === 'ERROR'}))
      }
    })
  }

  function onKeyDown(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      ask()
    }
  }

  return (<div className="w-full bg-gradient-to-b from-transparent py-10 to-white flex items-center justify-center">
    <div className='shadow-md bg-white focus-within:ring-2 focus-within:ring-offset-2 shadow-gray-200 border border-gray-200 rounded-md w-[42rem] h-32 max-h-32 shrink-0 p-2 flex'>
      <textarea
        value={text}
        onKeyDown={onKeyDown}
        onChange={e => dispatch(store.setInp({ inp: e.target.value }))}
        className=" h-full w-full focus:outline-none p-2 resize-none rounded-md"
        placeholder="Ctrl+Enter to Send Message"
      ></textarea>
      <button
        className=' h-full p-2 hover:bg-gray-50 active:bg-gray-100 rounded-md flex items-center ml-2'
        onClick={ask}
      >
        <SendSvg className='h-4 w-4'></SendSvg>
      </button>

    </div>

  </div>)
}