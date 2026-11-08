import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'unique-list-items'

function App() {
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

  return (
    <main className="app">
      {/* title and item count */}
      <header className="title">
        <h1>Unique List</h1>
        {/* number of items in the list */}
        <span className="item-count" aria-live="polite">
          {items.length}
        </span>
        <button
          className="clear-button"
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear the list?')) {
              setItems([])
            }
          }}
          disabled={items.length === 0}
        >
          Clear list
        </button>
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

export default App
