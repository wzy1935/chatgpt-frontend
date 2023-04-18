import { SSE } from 'sse.js'

`
messages looks like this:
[
  { "role": "system", "content": "You are a helpful assistant." },
  { "role": "user", "content": "Who won the world series in 2020?" },
  { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
  { "role": "user", "content": "Where was it played?" }
]
`

function chat(token, messages, onUpdate) {
  let inpObj = {
    "model": "gpt-3.5-turbo",
    "messages": messages,
    "stream": true
  }

  let outpStr = ''
  let lastStr = ''

  let source = new SSE('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    payload: JSON.stringify(inpObj)
  })

  source.onmessage = (e) => {
    if (e.data !== '[DONE]') {
    
      let respObj = JSON.parse(e.data)
      let delta = respObj.choices[0].delta.content
      if (delta !== undefined) {
        outpStr += delta
        onUpdate(outpStr, 'RUNNING')
      }

    } else {
      onUpdate(outpStr, 'DONE')
    }
  }

  source.onerror = (e) => {
    onUpdate(outpStr, 'ERROR')
  }

  source.stream()

}

function promiseToCallback() {
  let resolveFunc
  let promise = new Promise((resolve) => {
    resolveFunc = resolve
  })
  return [promise, resolveFunc]
}


export function initChatPromise() {
  let [promise, nextResolve] = promiseToCallback()
  chat((newStr, code) => {
    let [p, n] = promiseToCallback()
    nextResolve([[newStr, code], p])
    nextResolve = n
  })
  return promise
}

export default chat