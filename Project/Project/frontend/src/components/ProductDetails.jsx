import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../api.js'

const formatPrice = value => `₹${Number(value || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`

function ProductDetails({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(() => setError('This product could not be found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="detail-status">Loading product...</p>
  if (error) return <div className="detail-status"><p>{error}</p><Link className="btn" to="/">Back to products</Link></div>

  return (
    <article className="product-detail">
      <Link className="back-link" to="/">← Back to collection</Link>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">SHOP EASE / PRODUCT {String(product.id).padStart(2, '0')}</p>
          <h2>{product.name}</h2>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta">
            <span>{product.stock > 20 ? 'In stock' : 'Limited stock'}</span>
            <span>Ships in 2–4 days</span>
          </div>
          <button className="btn detail-button" onClick={() => addToCart(product)} disabled={!product.stock}>
            {product.stock ? 'Add to cart' : 'Sold out'} <span>+</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductDetails
