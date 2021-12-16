import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import kontenbase from '../../lib/kontenbase'
import '../../styles/form.css'

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    try {
      setIsLoading(true)
      await kontenbase.auth.login({ email, password })
      setIsLoading(false)
      navigate('/')
    } catch (error: any) {
      setIsLoading(false)
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='form-container'>
        <h1>Login Account</h1>
        <div className="input-wrapper">
          <label className="label" htmlFor="email">Email</label>
          <input required className="input" id="email" type="email" name="email" />
        </div>
        <div className="input-wrapper">
          <label className="label" htmlFor="password">Password</label>
          <input required className="input" id="password" type="password" name="password" />
        </div>
        <div className="button-wrapper">
          <button
            className="button"
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>
        </div>
        <div className="form-footer">
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
