import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import kontenbase from '../../lib/kontenbase'
import '../../styles/form.css'

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
      await kontenbase.auth.register({ email, password, firstName: name })
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
        <h1>Create Account</h1>
        <div className="input-wrapper">
          <label className="label" htmlFor="name">Name</label>
          <input required className="input" id="name" type="text" name="name" />
        </div>
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
            Register
          </button>
        </div>
        <div className="form-footer">
          <p>Already have an account? <Link to='/login'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register
