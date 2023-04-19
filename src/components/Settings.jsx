import { ReactComponent as XSvg } from '../assets/x.svg'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from '../stores/store'
import hash from 'object-hash'

export default function Settings({ onClose }) {
  const initSettings = useSelector(s => s.main.settings)
  const [model, setModel] = useState(initSettings.model)
  const [token, setToken] = useState(initSettings.token)
  const [maxLength, setmaxLength] = useState(initSettings.maxLength)
  const dispatch = useDispatch()

  function getChoosenClassName(expected, actual) {
    return (expected === model
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white py-1 px-4 rounded-md'
      : ' bg-gray-50 hover:bg-gray-100 py-1 px-4 rounded-md')
  }

  function generateModelButtons(modelList) {
    return modelList.map((thisModel, k) => {
      return (<button
        key={hash([thisModel, k])}
        className={getChoosenClassName(thisModel, model)}
        onClick={() => setModel(thisModel)}
      >{thisModel}</button>)
    })
  }

  function save() {
    const newSettings = {
      model, token, maxLength
    }
    console.log(newSettings)
    dispatch(store.saveSettings({ settings: newSettings }))
    onClose()
  }


  return (<div className=' p-8 bg-white rounded-lg flex flex-col space-y-6 items-stretch w-96'>
    <div className=' flex justify-between'>
      <div className=' text-lg font-bold'>Settings</div>
      <XSvg className='h-6 w-6 cursor-pointer' onClick={onClose}></XSvg>
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >Model</div>
      <div className='flex space-x-2'>
        {generateModelButtons(['gpt-3.5-turbo', 'gpt-4'])}
      </div>
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >OpenAI key</div>
      <input
        className='w-full bg-gray-50 p-2 focus:outline-none rounded-sm focus:ring-1'
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >Maximum length</div>
      <input
        type='number'
        min={1}
        max={2048}
        value={maxLength}
        className='w-full bg-gray-50 p-2 focus:outline-none rounded-sm focus:ring-1'
        onBlur={() => setmaxLength(Math.min(2048, Math.max(1, maxLength | 0)))}
        onChange={(e) => setmaxLength(e.target.value | 0)}
      />
    </div>

    <div className=' pt-2'>
      <button
        className=' bg-emerald-600 hover:bg-emerald-500 text-white w-24 p-1 rounded-md mr-2'
        onClick={save}
      >OK</button>
      <button
        className=' bg-gray-50 hover:bg-gray-100 w-24 p-1 rounded-md'
        onClick={onClose}
      >Cancel</button>
    </div>
  </div>)
}