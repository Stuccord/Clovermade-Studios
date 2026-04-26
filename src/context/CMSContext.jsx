import { createContext, useContext, useState, useEffect } from 'react'

const CMSContext = createContext(null)

const DEFAULT_CONTENT = {
  home: {
    heroTitle: 'Crafting Cinematic Stories Through Light',
    heroSubtitle: 'A boutique photography studio dedicated to capturing the raw, authentic, and timeless moments of your life.',
    featuredTag: 'Est. 2018'
  },
  about: {
    title: 'The Art of Observation',
    description: 'We believe that the most beautiful moments are the ones that happen naturally. Our approach is quiet, intentional, and focused on the interplay of light and emotion.',
    quote: 'Photography is a way of feeling, of touching, of loving.'
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
