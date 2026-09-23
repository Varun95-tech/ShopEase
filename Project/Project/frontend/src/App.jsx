import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import ProductDetails from './components/ProductDetails'

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopease_user')
    return saved ? JSON.parse(saved) : null
  })
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shopease_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('shopease_cart', JSON.stringify(cart))
  }, [cart])

  const handleLogin = signedInUser => {
    localStorage.setItem('shopease_user', JSON.stringify(signedInUser))
    setUser(signedInUser)
  }

  const handleLogout = () => {
    localStorage.removeItem('shopease_user')
    setUser(null)
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BrowserRouter>
      <div className={user ? 'app' : 'app login-shell'}>
        {user && <nav className="navbar">
          <Link to="/"><h1>ShopEase</h1></Link>
          <div className="nav-links">
            <Link to="/">Products</Link>
            <Link to="/cart">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button className="logout-button" onClick={handleLogout}>Log out</button>
          </div>
        </nav>}

        <main className="main-content">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
            <Route path="/" element={user ? <ProductList addToCart={addToCart} /> : <Navigate to="/login" replace />} />
            <Route path="/products/:id" element={user ? <ProductDetails addToCart={addToCart} /> : <Navigate to="/login" replace />} />
            <Route
              path="/cart"
              element={user ? (
                <Cart
                  cart={cart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
              ) : <Navigate to="/login" replace />}
            />
            <Route
              path="/checkout"
              element={user ? <Checkout cart={cart} clearCart={clearCart} /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App