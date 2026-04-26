import { useState } from 'react'
import { X, Minus, Plus, ShoppingBag, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './CartDrawer.css'

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen } = useCart()
  const { user, addOrder } = useAuth()
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to your Clovermade account to complete your purchase.")
      setIsOpen(false)
      navigate('/login')
      return
    }

    setIsCheckingOut(true)
    
    // Simulate payment processing delay
    setTimeout(() => {
      const orderItems = items.map(item => {
        let price = item.product.price;
        if (item.product.category === 'Prints') {
          if (item.variant === 'Medium') price *= 1.6;
          else if (item.variant === 'Large') price *= 2.4;
        }
        
        return {
          name: item.product.title,
          price: price,
          image: item.product.image,
          type: (item.product.category === 'Digital Downloads' || item.product.category === 'Presets') ? 'digital' : 'physical',
          variant: item.variant
        }
      })

      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        total: total,
        status: 'Processing',
        address: user.address || 'Standard Shipping Address',
        items: orderItems
      }

      addOrder(newOrder)
      clearCart()
      setIsCheckingOut(false)
      setIsOpen(false)
      
      alert("Purchase Successful! Your order has been saved to your account. Digital items are ready for download in your dashboard.")
      navigate('/dashboard')
    }, 2500)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="stack gap-8">
            <span className="section-label">Shopping Cart</span>
            <span className="serif" style={{ fontSize: '1.4rem' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} style={{ color: '#fff', opacity: 0.4, marginBottom: 16 }} />
            <p className="body-sm">Your cart is empty</p>
            <Link
              to="/store"
              className="btn btn-outline"
              style={{ marginTop: 24 }}
              onClick={() => setIsOpen(false)}
            >
              Browse Prints
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => {
                let price = item.product.price;
                if (item.product.category === 'Prints') {
                  if (item.variant === 'Medium') price *= 1.6;
                  else if (item.variant === 'Large') price *= 2.4;
                }

                return (
                  <div key={item.key} className="cart-item">
                    <div className="cart-item-img">
                      <img src={item.product.image} alt={item.product.title} />
                    </div>
                    <div className="cart-item-info">
                      <p className="cart-item-title">{item.product.title}</p>
                      <p className="cart-item-variant">{item.variant}</p>
                      <div className="cart-item-row">
                        <div className="qty-controls">
                          <button onClick={() => updateQty(item.key, -1)} aria-label="Decrease"><Minus size={12} /></button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.key, 1)} aria-label="Increase"><Plus size={12} /></button>
                        </div>
                        <span className="cart-item-price">${(price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeItem(item.key)} aria-label="Remove item">
                      <X size={14} />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span className="body-sm">Total</span>
                <span className="serif" style={{ fontSize: '1.6rem' }}>${total.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing Payment...' : <><Lock size={14} /> Checkout securely</>}
              </button>
              <button
                className="btn-ghost"
                style={{ textAlign: 'center', width: '100%', marginTop: 16 }}
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
