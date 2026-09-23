import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }
    onLogin({ email: email.trim() })
  }

  return (
    <div className="login-page">
      <div className="login-image" aria-hidden="true">
        <div className="login-image-caption">
          <span>SHOPEASE / 01</span>
          <strong>Small upgrades.<br />Better days.</strong>
        </div>
      </div>
      <div className="login-panel">
        <p className="eyebrow">WELCOME BACK</p>
        <h2>Make space<br />for better things.</h2>
        <p className="login-intro">Sign in to pick up where you left off and keep your everyday essentials together.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button className="btn login-button" type="submit">Enter ShopEase <span>→</span></button>
        </form>
        <p className="login-note">Demo access accepts any valid email and password.</p>
      </div>
    </div>
  )
}

export default Login
