import React from 'react'
import './ChatBotApp.css'

const ChatBotApp = () => {
  return <div className='chat-app'>
    <div className="chat-list">
        <div className="chat-list-header"> 
            <h2>Chat List</h2>
            <i className="bx bx-edit-alt new-chat">
            </i>
        </div>
        <div className="chat-list-items active">
            <h4>Chat 4/10/2026 12:35 AM </h4>
            <i className= "bx bx-x-circle"></i>
        </div>
        <div className="chat-list-items">
            <h4>Chat 4/10/2026 12:35 AM </h4>
            <i className= "bx bx-x-circle"></i>
        </div>
        <div className="chat-list-items">
            <h4>Chat 4/10/2026 12:35 AM </h4>
            <i className= "bx bx-x-circle"></i>
        </div> 
    </div>
    <div className="chat-window">
        <div className="chat-title">
            <h3> Chat with AI</h3>
            <i className='bx bx-arrow-back aarrow'></i>
        </div>
        <div className="chat">
            <div className="prompt">Hi, how are you </div>
            <span> 12:35 AM </span>
            <div className="response"> Hello !I'm just a computer program and I dont't have feelings but I'm here to assist you  </div>
            <span> 12:36 AM </span>
            <div>
              <div className="typing">Typing...</div>
            </div>
        </div>
        <form className='msg-form'>
             <i className='fa-solid fa-face-smile emoji'></i>
             <input type="text" className="msg-input"
             placeholder="Type a message..." />
             <i className="fa-solid fa-paper-plane"></i>
        </form>
    </div>
  </div>
}

export default ChatBotApp