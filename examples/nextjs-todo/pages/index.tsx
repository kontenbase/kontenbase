/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import formStyles from '../styles/Form.module.css'
import kontenbase from '../lib/kontenbase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Item {
  _id: string
  name: string
}

const SERVICE_NAME = 'New Service'

const Home: NextPage = () => {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [value, setValue] = useState('')

  const getData = () => {
    kontenbase.service<Item>(SERVICE_NAME).find()
      .then(res => {
        setItems(res.data || [])
      })
  }

  const getProfile = () => {
    kontenbase.auth.profile()
      .catch(res => {
        router.replace('/login')
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getProfile()
      getData()
    } else {
      router.replace('/login')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = value

    if (!name) {
      return
    }

    try {
      await kontenbase.service<Item>(SERVICE_NAME).create({ name })
      setValue('')
      getData()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleDelete = (item: Item) => {
    kontenbase.service<Item>(SERVICE_NAME).deleteById(item._id)
      .then(res => {
        getData()
      }).catch(err => {
        alert(err.message)
      })
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    kontenbase.auth.logout()
    router.replace('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <h1>Todo List</h1>
        <button
          className={styles.logout}
          onClick={handleClick}
        >
            Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.addWrapper}
      >
        <input
          name="name"
          className={formStyles.input}
          value={value}
          onChange={handleChangeValue}
        />
        <button
          className={formStyles.button}
          type="submit"
        >
          Add
        </button>
      </form>
      <div>
        {
          items.map(item => (
            <div className={styles.item} key={item._id}>
              <div>
                {item.name}
              </div>
              <div
                onClick={() => handleDelete(item)}
              >
                <svg className={styles.deleteIcon} focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="DeleteIcon" ><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="red"></path></svg>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home
