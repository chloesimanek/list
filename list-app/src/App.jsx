import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'unique-list-items'

function ListPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [items, setItems] = useState(() => {
    try {
      const savedItems = window.localStorage.getItem(STORAGE_KEY)
      if (savedItems === null) return []

      const parsedItems = JSON.parse(savedItems)
      if (!Array.isArray(parsedItems) || !parsedItems.every((item) => typeof item === 'string')) {
        throw new TypeError('Saved list must be an array of strings.')
      }

      return parsedItems
    } catch (error) {
      console.error('Unable to load the saved list from local storage.', error)
      return []
    }
  })
  const [entry, setEntry] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Unable to save the list to local storage.', error)
    }
  }, [items])

  function addItem(event) {
    event.preventDefault()
    const item = entry.trim()

    if (!item || items.some((existingItem) => existingItem.toLowerCase() === item.toLowerCase())) {
      setEntry('')
      return
    }

    setItems((currentItems) => [...currentItems, item])
    setEntry('')
  }

  function clearList() {
    setMenuOpen(false)
    if (window.confirm('Are you sure you want to clear the list?')) {
      setItems([])
    }
  }

  return (
    <main className="app">
      {/* title and item count */}
      <header className="title">
        <div className="title-copy">
          <h1>Endlist</h1>
          {/* number of items in the list */}
          <span className="item-count" aria-live="polite" aria-label={`${items.length} items`}>
            {items.length}
          </span>
        </div>
        <div className="menu">
          <button
            className="menu-button"
            type="button"
            aria-label="Open list menu"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-controls="list-menu"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.7" />
              <circle cx="12" cy="12" r="1.7" />
              <circle cx="12" cy="19" r="1.7" />
            </svg>
          </button>
          {menuOpen && (
            <div className="menu-popover" id="list-menu">
              <button
                className="menu-item"
                type="button"
                onClick={clearList}
                disabled={items.length === 0}
              >
                Clear list
              </button>
              <div className="menu-divider" role="separator" />
              <button className="menu-item" type="button" disabled>
                Share
              </button>
              <div className="menu-divider" role="separator" />
              <a className="menu-item about-menu-link" href="/about">
                About
              </a>
            </div>
          )}
        </div>
      </header>
      {/* add item and item list */}
      <section className="list-area" aria-label="Unique list items">
        <form className="entry-form" onSubmit={addItem}>
          <input
            className="textbox"
            aria-label="Add an item"
            placeholder="Type an item and press Enter"
            value={entry}
            onChange={(event) => setEntry(event.target.value)}
          />
        </form>
        <ul className="items">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function App() {
  if (window.location.pathname === '/about') {
    return (
      <main className="about-page">
        <p>Pick a topic, start listing, and see how many unique answers you can come up with.</p>
        <p>
          Inspired by{' '}
          <a href="https://www.instagram.com/datakabas/" target="_blank" rel="noreferrer">
            datakabas
          </a>{' '}
          and their challenge to name 3,000 real people in a single sitting.
        </p>
      </main>
    )
  }

  return <ListPage />
}

export default App
