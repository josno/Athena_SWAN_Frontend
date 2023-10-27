import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from 'react-bootstrap/card'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/form'
import Image from 'react-bootstrap/image'

import LoadScreen from '../reuseable-components/LoadScreen'

import { auth, firestore } from '../firebase.js'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Anonymous from '../assets/Anonymous.png'
import { FiSend } from 'react-icons/fi'

const ChatPage = ({ match }) => {
  const [loading, setLoading] = useState(true)

  // We set a loading icon here as we load the page
  // Once the user is signed up the loading icon should disappear
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  // We create a title for the chatroom using the params.room
  const roomName = match.params.room
    .split('-')
    .map((i) => i[0].toUpperCase() + i.slice(1, i.length))
    .join(' ')

  // We use a special firebase hook to set the user in order to persist their information
  const [user] = useAuthState(auth)

  // We will render a Please log in message if the user has not signed up
  // If they have we will show the chatroom
  return loading === false ? (
    <ChatPageStyles>
      <section style={{ paddingBottom: '10rem' }}>
        {user ? (
          <ChatRoom roomName={roomName} slugRoomName={match.params.room} />
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>Please Log In</p>
        )}
      </section>
    </ChatPageStyles>
  ) : (
    <LoadScreen />
  )
}

const ChatRoom = ({ roomName, slugRoomName }) => {
  const messagesRef = firestore.collection(`${slugRoomName}`)

  // We take the latest 25 chats and messages so we don't overload the UI
  const query = messagesRef.orderBy('createdAt').limit(25)

  // We are querying all messages inside the specific collection; in this case the category
  const [messages] = useCollectionData(query, { idField: 'id' })

  // For the message text area
  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    // We take the user's Google data and submit it along with the chat message
    const { uid, photoURL } = auth.currentUser

    // We submit to firebase
    await messagesRef.add({
      text: formValue,
      createdAt: new Date(),
      uid,
      photoURL,
    })

    setFormValue('')
  }

  return (
    <ChatRoomStyles title="chat-room">
      <CardStyles title="chat-card">
        <Card.Header title="chat-header" as="h5">
          Message Room: {roomName}
        </Card.Header>
        <Card.Body>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </Card.Body>
      </CardStyles>

      <FormStyles onSubmit={sendMessage}>
        <Form.Group controlId="messageInput">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Write something here..."
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            style={{ resize: 'none' }}
          />
        </Form.Group>
        <Button
          style={{ width: '5rem' }}
          variant="dark"
          type="submit"
          disabled={!formValue}
        >
          <FiSend />
        </Button>
      </FormStyles>
    </ChatRoomStyles>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message

  // We have to format the time here because it's not readable for Javascript
  let timestamp = new Date(createdAt.seconds * 1000).toLocaleTimeString()
  timestamp = timestamp.slice(0, -6) + timestamp.slice(-3)

  // Conditional style for message box colors
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <MessageWrapper
      type={messageClass}
      className={messageClass}
      title="message-wrapper"
    >
      <MessageStyles
        title="chat-message"
        className={messageClass}
        type={messageClass}
      >
        <Image src={photoURL || Anonymous} alt="photo-message" fluid />
        <p>{text}</p>
        <p className="date">{timestamp}</p>
      </MessageStyles>
    </MessageWrapper>
  )
}

// custom CSS using styled-components

const ChatPageStyles = styled.div`
  width: 100%;
`

const ChatRoomStyles = styled.div`
    max-height: 1000px;
    max-width: 1000px;
    margin: 3rem auto;
    border: 1px solid black;
    padding: 1rem;
    border-radius: 25px;
    .card-header {
        background-color: black;
    color: white;
    font-weight: bold;
    }
  }
`

// Bootstrap adjusted with styled components
const CardStyles = styled(Card)`
  min-height: 400px;
  max-height: 100vh;
  overflow: hidden;
  .card-body {
    overflow-y: scroll;
    border: 1px solid black;
    min-height: 500px;
    max-height: 500px;
    .card {
      display: flex;
    }
  }
`

const FormStyles = styled(Form)`
  display: flex;
  margin-top: 1rem;
  height: 4rem;
  max-height: 60px;
  .form-group {
    width: 100%;
    margin-right: 1rem;
    margin-bottom: 0px;
    input {
      height: 100%;
      border: 1px solid black;
    }
    button {
    }
  }
`

const MessageStyles = styled(Card)`
  border: none;
  width: fit-content;
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.8rem;

  flex-direction: ${(props) => (props.type === 'sent' ? 'row-reverse' : 'row')};

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    border-radius: 10px;
    margin: 0.1rem;
    color: #000000;
    max-width: 90%;
    font-size: 0.8rem;

    background-color: ${(props) =>
      props.type === 'sent' ? '#ffd085' : '#cbe0e1'};
  }

  .date {
    position: absolute;
    left: ${(props) => (props.type === 'sent' ? '' : '2rem')};
    right: ${(props) => (props.type === 'sent' ? '2rem' : '')};
    bottom: -1rem;
    background: none;
    font-size: 0.6rem;
    z-index: 1;
    max-width: 100px;
    min-width: fit-content;
  }
`

const MessageWrapper = styled(Card)`
  width: 100%;
  display: flex;

  align-items: ${(props) =>
    props.type === 'sent' ? 'flex-end' : 'flex-start'};
  border: none;
`

export default ChatPage
