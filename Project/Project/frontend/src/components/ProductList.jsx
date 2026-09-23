import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api.js'

const formatPrice = value => `₹${Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Failed to load products. Make sure backend is running.')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  const categories = ['All', ...new Set(products.map(product => {
    if (product.name.includes('Headphones') || product.name.includes('Keyboard')) return 'Desk & Audio'
    if (product.name.includes('Watch')) return 'Wearables'
    if (product.name.includes('Backpack')) return 'Carry'
    return 'Accessories'
  }))]

  const visibleProducts = products.filter(product => {
    const productCategory = product.name.includes('Headphones') || product.name.includes('Keyboard')
      ? 'Desk & Audio'
      : product.name.includes('Watch')
        ? 'Wearables'
        : product.name.includes('Backpack')
          ? 'Carry'
          : 'Accessories'
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (category === 'All' || category === productCategory)
  })

  return (
    <div className="storefront">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h2>Useful things, chosen well.</h2>
          <p>Curated tech and carry essentials for workdays that move a little faster.</p>
          <a className="hero-link" href="#catalog">Explore the collection <span>→</span></a>
        </div>
        <div className="hero-note">
          <span>05</span>
          <p>small upgrades<br />to your daily setup</p>
        </div>
      </section>

      <section id="catalog" className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOP THE DROP</p>
            <h2>All products</h2>
          </div>
          <span className="result-count">{visibleProducts.length} items</span>
        </div>

        <div className="catalog-tools">
          <label className="search-box">
            <span>Search</span>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find your next favorite" />
          </label>
          <div className="category-list" aria-label="Product categories">
            {categories.map(item => (
              <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
        {visibleProducts.map((product, index) => (
          <Link key={product.id} to={`/products/${product.id}`} className="product-card">
            <div className="product-image-wrap">
              <span className="product-index">0{index + 1}</span>
              <img src={product.imageUrl || 'https://via.placeholder.com/300x180?text=Product'} alt={product.name} />
            </div>
            <div className="product-info">
              <div className="product-title-row">
                <h3>{product.name}</h3>
                <span className="stock-label">{product.stock > 20 ? 'In stock' : 'Low stock'}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <div className="price">{formatPrice(product.price)}</div>
                <button className="btn add-button" onClick={event => { event.preventDefault(); addToCart(product) }} disabled={!product.stock}>
                  {product.stock ? 'Add' : 'Sold out'} <span>+</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
        </div>
        {visibleProducts.length === 0 && <div className="no-results">No products match that search.</div>}
      </section>
    </div>
  )
}

export default ProductList
