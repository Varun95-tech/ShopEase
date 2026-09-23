import { Link } from 'react-router-dom'

function Cart({ cart, updateQuantity, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Go add some products!</p>
        <Link to="/" className="btn" style={{ display: 'inline-block', marginTop: '1rem', width: 'auto' }}>
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <div>₹{item.price.toFixed(2)} × {item.quantity}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
        </div>
      ))}

      <div className="cart-total">Total: ₹{total.toFixed(2)}</div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
        <Link to="/checkout" className="btn" style={{ textAlign: 'center' }}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart