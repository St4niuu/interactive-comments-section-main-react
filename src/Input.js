import React from 'react'
import {inputValue} from './App'

function Input(props) {
  return (
    <div className='input'>
        <textarea rows={5} cols={10} placeholder={'Add a comment...'} ref={props.inputValue}></textarea>
        <div className='footer'>
            <img src={props.image} alt='image' />
            <button onClick={props.addComment}>Send</button>
        </div>
    </div>
  )
}

export default Input
