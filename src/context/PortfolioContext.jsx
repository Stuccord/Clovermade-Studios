/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext(null)

const INITIAL_PORTFOLIO = [
  {
    id: 'p1',
    title: 'The Eternal Vow',
    category: 'Wedding',
    description: 'A cinematic journey through a sunset ceremony in the heart of Tuscany.',
    mainImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80'
    ]
  },
  {
    id: 'p2',
    title: 'Midnight in Paris',
    category: 'Portrait',
    description: 'Editorial portrait series capturing the soul of the city of light.',
    mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80'
    ]
  }
]

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('clovermade_portfolio')
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO
  })

  useEffect(() => {
    localStorage.setItem('clovermade_portfolio', JSON.stringify(portfolio))
  }, [portfolio])

  const addPortfolioItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() }
    setPortfolio(prev => [newItem, ...prev])
    return { success: true }
  }

  const updatePortfolioItem = (id, updatedItem) => {
    setPortfolio(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item))
    return { success: true }
  }

  const deletePortfolioItem = (id) => {
    setPortfolio(prev => prev.filter(item => item.id !== id))
    return { success: true }
  }

  return (
    <PortfolioContext.Provider value={{ 
      portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem 
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
