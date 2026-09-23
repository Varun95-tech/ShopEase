import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api.js'

function Checkout({ cart, clearCart }) {
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) return

    setLoading(true)
    try {
      await axios.post('/api/orders', {
        customerName: form.name,
        customerEmail: form.email,
        shippingAddress: form.address,
        phone: form.phone,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total
      })
      setSuccess(true)
      clearCart()
      setTimeout(() => navigate('/'), 3000)
    } catch (err) {
      alert('Order failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="checkout-page">
        <div className="success-msg">
          Order placed successfully! Thank you for shopping with ShopEase.
        </div>
        <p>Redirecting to home...</p>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p style={{ marginBottom: '1.5rem' }}>Total: <strong>₹{total.toFixed(2)}</strong></p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Shipping Address</label>
          <input name="address" value={form.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout
