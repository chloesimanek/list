import { useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [entry, setEntry] = useState('')

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
