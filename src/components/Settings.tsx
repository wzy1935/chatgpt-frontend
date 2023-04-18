import { ReactComponent as XSvg } from '../assets/x.svg'

export default function Settings({ onClose }) {
  return (<div className=' p-8 bg-white rounded-lg flex flex-col space-y-6 items-stretch w-96'>
    <div className=' flex justify-between'>
      <div className=' text-lg font-bold'>Settings</div>
      <XSvg className='h-6 w-6 cursor-pointer' onClick={() => onClose()}></XSvg>
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >Model</div>
      <div className='flex space-x-2'>
        <button className=' bg-emerald-600 hover:bg-emerald-500 text-white py-1 px-4 rounded-md'>gpt-3.5-turbo</button>
        <button className=' bg-gray-50 hover:bg-gray-100 py-1 px-4 rounded-md'>gpt-4</button>
      </div>
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >OpenAI key</div>
      <input className='w-full bg-gray-50 p-2 focus:outline-none rounded-sm focus:ring-1' />
    </div>

    <div className=''>
      <div className=' text-sm text-gray-600 mb-1' >Maximum length</div>
      <input className='w-full bg-gray-50 p-2 focus:outline-none rounded-sm focus:ring-1' />
    </div>

    <div className=' pt-2'>
      <button className=' bg-emerald-600 hover:bg-emerald-500 text-white w-24 p-1 rounded-md mr-2'>OK</button>
      <button className=' bg-gray-50 hover:bg-gray-100 w-24 p-1 rounded-md'>Cancel</button>
    </div>
  </div>)
}