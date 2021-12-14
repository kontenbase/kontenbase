/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import kontenbase from '../lib/kontenbase'
import styles from '../styles/Form.module.css'

const Login: NextPage = () => {
  const { replace } = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    try {
      await kontenbase.auth.login({ email, password })
      replace('/')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login Account</h1>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" name="email" />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input className={styles.input} id="password" type="password" name="password" />
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            type="submit"
          >
            Login
          </button>
        </div>
        <div className={styles.footer}>
          <p>Don't have an account? <Link href='/register'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
