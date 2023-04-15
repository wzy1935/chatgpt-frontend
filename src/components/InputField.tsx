import { store } from '../stores/store'
import { useSelector, useDispatch } from 'react-redux'

export default function InputField() {
  let text = useSelector(s => s.main.live.inp)
  let dispatch = useDispatch()

  return (<div className="w-full bg-gradient-to-b from-transparent py-10 to-white flex items-center justify-center">
    <textarea
      value={text}
      onChange={e => dispatch(store.setInp({ inp: e.target.value }))}
      className=" shadow-md shadow-neutral-200 border border-neutral-200 rounded-md w-[42rem] h-32 max-h-32 p-4 shrink-0 focus:outline-none focus:ring-2"
      placeholder="Ctrl+Enter to Send Message"
    ></textarea>
    <div className='h-32 ml-2'>
      <button
        className='h-full bg-teal-400 text-white rounded-md'
        onClick={() => dispatch(store.submitUserLive())}
      >SUBMIT</button>
    </div>
  </div>)
}