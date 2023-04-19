export default function StartPage() {
  return (<div className=" h-full w-full flex flex-col">
    <div className="text-center h-full w-full flex flex-col space-y-4 justify-center items-center">
      <div className=" font-bold text-3xl">ChatGPT Frontend</div>
      <p className=" text-sm">
        An unofficial pure frontend implementation of the ChatGPT website. <br />
        For personal study only, do not use for commercial purposes. <br />
        Set up your OpenAI key in settings first.
      </p>
    </div>
    <div className=' w-full h-48'></div>
  </div>)
}