import { useState } from 'react'
import { ReactComponent as XSvg } from '../assets/x.svg'
import { useDispatch } from 'react-redux'
import { store } from '../stores/store'

const defaultText = `{
  "settings": {
    "model": "gpt-3.5-turbo",
    "token": "",
    "maxLength": 512
  },
  "current": null,
  "live": {
    "inp": "",
    "id": null,
    "user": null,
    "assistant": null
  },
  "sessions": []
}`

export default function ({ onClose }) {
  let [data, setData] = useState(localStorage.getItem('data'))
  const dispatch = useDispatch()

  function onSave() {
    localStorage.setItem('data', data)
    location.reload()
  }

  return (<div className=' p-8 bg-white rounded-lg flex flex-col space-y-6 items-stretch max-w-xl w-full'>
    <div className=' flex justify-between'>
      <div className=' text-lg font-bold'>Local data</div>
      <XSvg className='h-6 w-6 cursor-pointer' onClick={onClose}></XSvg>
    </div>

    <div>
      <p className='text-sm text-gray-600 mb-1'>
        Here's data you've stored in local storage. Copy/Paste to export/import data.
      </p>
      <p className='text-sm text-red-600 mb-1'>
        Editing ilegally may cause the application to crash and lose all your data, so make sure you know what you are doing.
      </p>
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        className=' h-64 w-full overflow-scroll whitespace-pre text-sm font-mono resize-none bg-gray-100 focus:ring-1 focus:outline-none'
      />
    </div>


    <div className=' pt-2'>
      <button
        className=' bg-emerald-600 hover:bg-emerald-500 text-white w-24 p-1 rounded-md mr-2'
        onClick={onSave}
      >Save</button>
      <button
        className=' bg-red-600 hover:bg-red-500 text-white w-24 p-1 rounded-md mr-2'
        onClick={() => setData(defaultText)}
      >Clear</button>
      <button
        className=' bg-gray-50 hover:bg-gray-100 w-24 p-1 rounded-md'
        onClick={onClose}
      >Cancel</button>
    </div>
  </div>)

}