import React, { useState, useRef } from 'react'
import Reply from './Reply'
import {LoggedUser} from './App'
import {v4} from 'uuid'

function Comment(props) {

  const user = React.useContext(LoggedUser)
  const currentVotes = React.useRef()

  const [replyToComment, setReplyToComment] = useState(false)
  const [edit, setEdit] = useState(false)

  const inputValue = useRef()

  function upVote()
  {
    currentVotes.current.innerHTML = Number(currentVotes.current.innerHTML) + 1
    props.setContent(prevData => {
        const data = {...prevData, comments: [...prevData.comments]}
        data.comments[props.index].score = currentVotes.current.innerHTML
        return data
    })
  }
  function downVote()
  {
    currentVotes.current.innerHTML = Number(currentVotes.current.innerHTML) - 1
    props.setContent(prevData => {
        const data = {...prevData, comments: [...prevData.comments]}
        data.comments[props.index].score = currentVotes.current.innerHTML
        return data
    })
  }

  function addReplyToComment()
  {
    if(!inputValue.current.value) return
    const contentToSet = JSON.parse(JSON.stringify(props.contents))
    contentToSet.comments[props.index].replies = [...contentToSet.comments[props.index].replies, {id: v4(), content: inputValue.current.value, createdAt: 'Now', score: 0, replyingTo: contentToSet.comments[props.index].user.username, user: {image: {png: contentToSet.currentUser.image.png}, username: contentToSet.currentUser.username}}]
    setReplyToComment(false)
    props.setContent(contentToSet)
  }

  function editComment()
  {
    if(!inputValue.current.value) return
    const contentToSet = JSON.parse(JSON.stringify(props.contents))
    contentToSet.comments[props.index].content = inputValue.current.value
    setEdit(false)
    props.setContent(contentToSet)
  }
  
  return (
    <div className='container'>
        <div className='comment'>
            <div className='header'>
                <img src={props.image} alt='image' />
                <span>{props.username}</span>
                {props.username === user &&
                    <div className='logged'>you</div>
                }
                <span>{props.created}</span>
            </div>
            {!edit &&
                <div className='content'>
                    {props.content}
                </div>
            }
            {edit &&
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
                        <div className='reply' onClick={() => {setReplyToComment(true)}}>
                            <img src='./images/icon-reply.svg' alt='reply' />
                            <span>Reply</span>
                        </div>
                    }
                    {(props.username === user && !edit) &&
                            <>
                                <div className='delete' onClick={() => {props.contentToDelete(); props.setCommentToDelete(props.id)}}>
                                    <img src='./images/icon-delete.svg' alt='delete' />
                                    <span>Delete</span>
                                </div>
                                <div className='edit' onClick={() => {setEdit(true)}}>
                                    <img src='./images/icon-edit.svg' alt='edit' />
                                    <span>Edit</span>
                                </div>
                            </>
                    }
                    {(props.username === user && edit) &&
                            <button onClick={editComment}>Update</button>
                    }
                </div>
            </div>
        </div>
        {replyToComment &&
            <div className='addReplyToComment'>
                <img src={props.contents.currentUser.image.png} alt='image' />
                <textarea rows={3} cols={1} placeholder={'Type in here a reply...'} ref={inputValue}></textarea>
                <button onClick={addReplyToComment}>Reply</button>
            </div>
        }
        {props.replies &&
            props.replies.map((value, index) => {
                return <Reply key={value.id} edit={edit} setEdit={setEdit}commentIndex={props.index} replyIndex={index} contents={props.contents} commentId={props.id} id={value.id} contentToDelete={props.contentToDelete} setReplyToDelete={props.setReplyToDelete} setContent={props.setContent} indexComment={props.index} indexReply={index} image={value.user.image.png} username={value.user.username} created={value.createdAt} content={value.content} score={value.score} replies={value.replies} replyTo={value.replyingTo}/>
            })
        }
    </div>
  )
}

export default Comment