import { useState } from 'react'

function Menu({ items, onClearList }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')

  function clearList() {
    setMenuOpen(false)
    onClearList()
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(items.join('\n'))
      setCopyStatus('Copied!')
    } catch (error) {
      console.error('Unable to copy the list to the clipboard.', error)
      setCopyStatus('Copy failed')
    }
  }

  function toggleMenu() {
    if (menuOpen) setCopyStatus('')
    setMenuOpen((isOpen) => !isOpen)
  }

  return (
    <div className="menu">
      <button
        className="menu-button"
        type="button"
        aria-label="Open list menu"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        aria-controls="list-menu"
        onClick={toggleMenu}
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
          <button
            className="menu-item"
            type="button"
            onClick={copyList}
            disabled={items.length === 0}
          >
            {copyStatus || 'Copy'}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copyStatus}
          </span>
          <div className="menu-divider" role="separator" />
          <a className="menu-item about-menu-link" href="/about">
            About
          </a>
        </div>
      )}
    </div>
  )
}

export default Menu
