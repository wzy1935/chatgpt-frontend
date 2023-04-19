import { SSE } from 'sse.js'

function chat(messages, settings, onUpdate) {
  let inpObj = {
    "max_tokens": settings.maxLength,
    "model": settings.model,
    "messages": messages,
    "stream": true
  }

  let outpStr = ''

  let source = new SSE('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.token}`
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