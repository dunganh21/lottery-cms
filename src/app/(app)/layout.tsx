'use client'
import React, { useEffect } from 'react'
import './app.scss'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  useEffect(() => {
    const syncThemeWithParent = () => {
      try {
        // Get computed styles from parent frame
        const parentStyles = window.parent.document.documentElement.computedStyleMap()
        const root = document.documentElement

        // Sync theme variables
        root.style.setProperty('--theme-bg', parentStyles.get('--theme-bg')?.toString() || '')
        root.style.setProperty('--theme-text', parentStyles.get('--theme-text')?.toString() || '')
        // Add other variables as needed
      } catch (error) {
        console.log('Theme sync error:', error)
      }
    }

    // Initial sync
    syncThemeWithParent()

    // Listen for theme changes in parent
    const observer = new MutationObserver(syncThemeWithParent)
    try {
      observer.observe(window.parent.document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      })
    } catch (error) {
      console.log('Observer setup error:', error)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
        {children}
      </body>
    </html>
  )
}
