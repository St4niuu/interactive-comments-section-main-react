import React from 'react'

function Delete(props) {
  return (
    <div className='delete'>
        <div className='deleteContainer'>
            <h3>Delete comment</h3>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className='footer'>
                <button onClick={props.deleteCancel}>No, cancel</button>
                <button onClick={props.deleteAccept}>Yes, delete</button>
            </div>
        </div>
    </div>
  )
}

export default Delete
