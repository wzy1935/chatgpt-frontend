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

export default async function (token, messages, onUpdate) {
  let inpObj = {
    "model": "gpt-3.5-turbo",
    "messages": messages,
    "stream": true
  }

  let outpStr = ''

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

