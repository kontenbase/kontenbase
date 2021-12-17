/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import kontenbase from '../lib/kontenbase'
import styles from '../styles/Form.module.css'

const Register: NextPage = () => {
  const { replace } = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
      name: { value: string }
    }
    const email = target.email.value
    const password = target.password.value
    const name = target.name.value

    try {
      await kontenbase.auth.register({ email, password, firstName: name })
      replace('/')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Create Account</h1>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input className={styles.input} id="name" type="text" name="name" />
        </div>
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
            Register
          </button>
        </div>
        <div className={styles.footer}>
          <p>Already have an account? <Link href='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register
