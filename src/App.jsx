import React from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'
import ChatWithReports from './Components/ChatWithReports'

const APP = () => {
  const[isChatting, setIsChatting] = React.useState(false)
  const[useNewInterface, setUseNewInterface] = React.useState(false)

  const handleStartChat = () => {
    setIsChatting(true)
    setUseNewInterface(true)
  }

  const handleGoBack = () => {
    setIsChatting(false)
    setUseNewInterface(false)
  }

  return (
    <div className="container">
      {!isChatting ? (
        <ChatBotStart onStartChat={handleStartChat} />
      ) : useNewInterface ? (
        <ChatWithReports onGoBack={handleGoBack} />
      ) : (
        <ChatBotApp onGoBack={handleGoBack} />
      )}
    </div>
  )
}

export default APP

