import { useState } from 'react'

function Menu({ itemCount, onClearList }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function clearList() {
    setMenuOpen(false)
    onClearList()
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
            disabled={itemCount === 0}
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
  )
}

export default Menu
