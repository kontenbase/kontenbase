/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from 'react'
import { MessageList } from 'react-chat-elements'
import { useNavigate } from 'react-router-dom'

import kontenbase from '../../lib/kontenbase'
import 'react-chat-elements/dist/main.css'
import './Chat.css'
import ChatType from '../../types/Chat'
import { Sort } from '@kontenbase/sdk'
import AppBar from '../../components/AppBar'

const SERVICE_NAME = 'chats'

const Chat = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>({})
  const [chats, setChats] = useState<ChatType[] | null | undefined>([])
  const [subscribeKey, setSubsribeKey] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const getProfile = () => {
    kontenbase.auth.profile()
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        navigate('/login')
      })
  }

  const getChats = () => {
    kontenbase.service<ChatType>(SERVICE_NAME).find({
      sort: {
        createdAt: Sort.DESC
      }
    })
      .then(res => {
        setChats(res.data?.reverse())
      })
      .catch((err: any) => {
        alert(err.message)
      })
  }

  const subscribeChats = async () => {
    try {
      const subscribeKey = await kontenbase.realtime.subscribe(SERVICE_NAME, (message) => {
        if (message.event === "CREATE_RECORD") {
          getChats()
        }
      })

      setSubsribeKey(subscribeKey)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getProfile()
      getChats()
      subscribeChats()
    } else {
      navigate('/login')
    }

    return () => {
      if (subscribeKey) {
        kontenbase.realtime.unsubscribe(subscribeKey)
      }
    }
  }, [])

  const createChat = (text: string) => {
    kontenbase.service<ChatType>(SERVICE_NAME).create({
      text
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      createChat(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const handleLogout = () => {
    kontenbase.auth.logout()
    navigate('/login')
  }

  const dataSource = useMemo(() => {
    return chats?.map(item => {
      const isCreated = item.createdBy?.email === user.email
      return {
        title: isCreated ? null : item.createdBy ? item.createdBy.firstName : 'Anonymous',
        text: item.text,
        date: new Date(item.createdAt),
        type: 'text',
        position: isCreated ? 'right' : 'left'
      }
    })
  }, [chats, user])

  return (
    <>
      <AppBar
        user={user}
      />
      <div
        className='container'
      >
        <MessageList
          className='chat-list'
          lockable={true}
          dataSource={dataSource}
        />
        <form onSubmit={handleSubmit} className='chat-input-wrapper'>
          <input
            placeholder="Type here..."
            ref={inputRef}
            className='chat-input'
            autoFocus
          />
          <button
            type="submit"
            className='chat-button'
          >
            <img alt='Send' src='/send.svg' />
          </button>
        </form>
      </div>
    </>

  )
}

export default Chat