import Block from './Block'

import { store } from '../stores/store'
import { useSelector, useDispatch } from 'react-redux'

export default function Live() {
  const current = useSelector(s => s.main.current)
  const live = useSelector(s => s.main.live)

  return (current === live.session && (<div>
    {live.user !== null && (
      <Block role='user' content={live.user}></Block>
    )}
    {live.assistant !== null && (
      <Block role='assistant' content={live.assistant}></Block>
    )}
  </div>))

}