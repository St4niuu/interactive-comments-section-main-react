import React from 'react'
import {LoggedUser} from './App'
import {v4} from 'uuid'

function Reply(props) {

  const user = React.useContext(LoggedUser)
  const currentVotes = React.useRef()

  const [replyToReply, setReplyToReply] = React.useState(false)
  const [editReply, setEditReply] = React.useState(false)

  const inputValue = React.useRef()

  function upVote()
  {
    currentVotes.current.innerHTML = Number(currentVotes.current.innerHTML) + 1
    props.setContent(prevData => {
        const data = {...prevData, comments: [...prevData.comments]}
        data.comments[props.indexComment].replies[props.indexReply].score = currentVotes.current.innerHTML
        return data
    })
  }
  function downVote()
  {
    currentVotes.current.innerHTML = Number(currentVotes.current.innerHTML) - 1
    props.setContent(prevData => {
        const data = {...prevData, comments: [...prevData.comments]}
        data.comments[props.indexComment].replies[props.indexReply].score = currentVotes.current.innerHTML
        return data
    })
  }

  function addReplyToReply()
  {
    if(!inputValue.current.value) return
    const contentToSet = JSON.parse(JSON.stringify(props.contents))
    contentToSet.comments[props.commentIndex].replies = [...contentToSet.comments[props.commentIndex].replies, {id: v4(), content: inputValue.current.value, createdAt: 'Now', score: 0, replyingTo: contentToSet.comments[props.commentIndex].replies[props.replyIndex].user.username, user: {image: {png: contentToSet.currentUser.image.png}, username: contentToSet.currentUser.username}}]
    setReplyToReply(false)
    props.setContent(contentToSet)
  }

  function editReplayFunction()
  {
    if(!inputValue.current.value) return
    const contentToSet = JSON.parse(JSON.stringify(props.contents))
    contentToSet.comments[props.commentIndex].replies[props.replyIndex].content = inputValue.current.value
    setEditReply(false)
    props.setContent(contentToSet)
  }

  return (
    <>
        <div className='reply'>
                <div className='header'>
                    <img src={props.image} alt='image' />
                    <span>{props.username}</span>
                    {props.username === user &&
                        <div className='logged'>you</div>
                    }
                    <span>{props.created}</span>
                </div>
                {!editReply &&
                    <div className='content'>
                        <span>@{props.replyTo}</span> {props.content}
                    </div>
                }
                {editReply &&
                    <div className='content'>
                        <textarea rows={3} cols={1} placeholder={'Type in here a reply...'} ref={inputValue}></textarea>
                    </div>
                }
                <div className='footer'>
                    <div className='input'>
                        <img onClick={upVote} src='./images/icon-plus.svg' alt='plus' />
                        <img onClick={downVote} src='./images/icon-minus.svg' alt='minus' />
                        <span ref={currentVotes}>{props.score}</span>
                    </div>
                    <div className='options'>
                        {props.username !== user &&
                            <div className='reply' onClick={() => {setReplyToReply(true)}}>
                                <img src='./images/icon-reply.svg' alt='reply' />
                                <span>Reply</span>
                            </div>
                        }
                        {(props.username === user && !editReply) &&
                            <>
                                <div className='delete' onClick={() => {props.contentToDelete(); props.setReplyToDelete([props.commentIndex, props.replyIndex])}}>
                                    <img src='./images/icon-delete.svg' alt='delete' />
                                    <span>Delete</span>
                                </div>
                                <div className='edit' onClick={() => {setEditReply(true)}}>
                                    <img src='./images/icon-edit.svg' alt='edit' />
                                    <span>Edit</span>
                                </div>
                            </>
                        }
                        {(props.username === user && editReply) &&
                            <button onClick={editReplayFunction}>Update</button>
                        }
                    </div>
                </div>
        </div>
        {replyToReply &&
            <div className='addReplyToReply'>
                <img src={props.contents.currentUser.image.png} alt='image' />
                <textarea rows={3} cols={1} placeholder={'Type in here a reply...'} ref={inputValue}></textarea>
                <button onClick={addReplyToReply}>Reply</button>
            </div>
        }
    </>
  )
}

export default Reply
