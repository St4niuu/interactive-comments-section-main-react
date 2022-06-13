import React, { useEffect, useState, useRef } from 'react'
import './index.css'
import Data from './data.json'
import Comment from './Comment'
import Input from './Input'
import Delete from './Delete'
import {v4} from 'uuid'

export const LoggedUser = React.createContext(Data.currentUser.username)

function App() {

  const [content, setContent] = useState(Data)
  const [deleteStatus, setDeleteStatus] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState()
  const [replyToDelete, setReplyToDelete] = useState()
  useEffect(() => {
    if(localStorage.getItem("contentStorage"))
    {
      setContent(JSON.parse(localStorage.getItem("contentStorage")))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('contentStorage', JSON.stringify(content))
  }, [content])

  const comments = content.comments

  const inputValue = React.useRef()

  function addComment()
  {
    const value = inputValue.current.value
    inputValue.current.value = null
    if(value)
    {
      setContent(prevData => {
        return {...prevData, comments: [...prevData.comments, {id: v4(), content: value, createdAt: 'Now', score: 0, user: {image: {png: content.currentUser.image.png}, username: content.currentUser.username}, replies: []}]}
      })
    }
  }
  function contentToDelete()
  {
    setDeleteStatus(true)
  }
  function deleteCancel()
  {
    setDeleteStatus(false)
  }
  function deleteAccept()
  {
    const currentUser = content.currentUser
    let comments = content.comments
    if(commentToDelete)
    {
      comments = content.comments.filter((value) => value.id !== commentToDelete)
      setCommentToDelete(false)
    }
    else if(replyToDelete)
    {
      console.log(comments[replyToDelete[0]].replies)
      comments[replyToDelete[0]].replies = content.comments[replyToDelete[0]].replies.filter((value, index) => index !== replyToDelete[1])
      setReplyToDelete(false)
    }
    const contentToSet = {currentUser, comments}
    setContent(contentToSet)
    setDeleteStatus(false)
  }
  return (
    <LoggedUser.Provider value={Data.currentUser.username}>
      {comments.map((value, index) => {
        return <Comment key={value.id} id={value.id} index={index} contents={content} setCommentToDelete={setCommentToDelete} setReplyToDelete={setReplyToDelete} contentToDelete={contentToDelete} setContent={setContent} image={value.user.image.png} username={value.user.username} created={value.createdAt} content={value.content} score={value.score} replies={value.replies} />
      })}
      <Input inputValue={inputValue} addComment={addComment} image={Data.currentUser.image.png}/>
      {deleteStatus &&
        <Delete deleteCancel={deleteCancel} deleteAccept={deleteAccept} />
      }
    </LoggedUser.Provider>
  )
}

export default App
