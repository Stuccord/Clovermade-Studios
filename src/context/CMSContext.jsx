/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const CMSContext = createContext(null)

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Crafting Cinematic Stories Through Light',
    heroSubtitle: 'A boutique photography studio dedicated to capturing the raw, authentic, and timeless moments of your life.',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=85&fit=crop'
  },
  about: {
    title: 'The Art of Observation',
    description: 'We believe that the most beautiful moments are the ones that happen naturally. Our approach is quiet, intentional, and focused on the interplay of light and emotion.',
    heroImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1800&q=85&fit=crop'
  },
  portfolio: {
    heroTitle: 'Portfolio',
    heroSubtitle: 'A curated collection of moments, stories, and visual art spanning five years of craft.',
    heroImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85&fit=crop'
  },
  clothing: {
    heroTitle: 'Clothing',
    heroSubtitle: 'Premium studio wear designed for comfort and longevity.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85&fit=crop'
  },
  digitalAssets: {
    heroTitle: 'Digital Assets',
    heroSubtitle: 'Professional tools and resources to elevate your creative workflow.',
    heroImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=85&fit=crop'
  },
  services: {
    heroTitle: 'Our Services',
    heroSubtitle: 'Tailored experiences to capture your unique story.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&fit=crop'
  },
  contact: {
    heroTitle: 'Get in Touch',
    heroSubtitle: 'Let\'s create something beautiful together.',
    heroImage: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1600&q=85&fit=crop'
  }
}

export function CMSProvider({ children }) {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('clovermade_cms')
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT
  })

  useEffect(() => {
    localStorage.setItem('clovermade_cms', JSON.stringify(content))
  }, [content])

  const updateContent = (section, newContent) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newContent }
    }))
  }

  return (
    <CMSContext.Provider value={{ content, updateContent }}>
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => useContext(CMSContext)
