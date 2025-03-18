import React, { useState } from '@theia/core/shared/react';
import { Settings, Plus, Minus, Search } from 'lucide-react';
import './Toolbar.css';

const Toolbar: React.FC = () => {
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);

  const toggleDropdown1 = () => {
    setIsDropdown1Open(!isDropdown1Open);
    if (isDropdown2Open) setIsDropdown2Open(false);
  };

  const toggleDropdown2 = () => {
    setIsDropdown2Open(!isDropdown2Open);
    if (isDropdown1Open) setIsDropdown1Open(false);
  };

  const closeDropdowns = () => {
    setIsDropdown1Open(false);
    setIsDropdown2Open(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.toolbar-dropdown-container')) {
        closeDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="toolbar-buttons">
          <button className="toolbar-button" aria-label="Settings">
            <Settings size={16} />
          </button>
          <button className="toolbar-button" aria-label="Add">
            <Plus size={16} />
          </button>
          <button className="toolbar-button" aria-label="Remove">
            <Minus size={16} />
          </button>
          <button className="toolbar-button" aria-label="Search">
            <Search size={16} />
          </button>
        </div>

        <div className="toolbar-dropdowns">
          <div className="toolbar-dropdown-container">
            <button
              className={`toolbar-dropdown-button ${
                isDropdown1Open ? 'active' : ''
              }`}
              onClick={toggleDropdown1}
              aria-expanded={isDropdown1Open}
              aria-haspopup="true"
            >
              Options
              <svg
                className={`dropdown-arrow ${isDropdown1Open ? 'open' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isDropdown1Open && (
              <div className="toolbar-dropdown-menu">
                <div className="toolbar-dropdown-item">Option 1</div>
                <div className="toolbar-dropdown-item">Option 2</div>
                <div className="toolbar-dropdown-item">Option 3</div>
              </div>
            )}
          </div>

          <div className="toolbar-dropdown-container">
            <button
              className={`toolbar-dropdown-button ${
                isDropdown2Open ? 'active' : ''
              }`}
              onClick={toggleDropdown2}
              aria-expanded={isDropdown2Open}
              aria-haspopup="true"
            >
              More
              <svg
                className={`dropdown-arrow ${isDropdown2Open ? 'open' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isDropdown2Open && (
              <div className="toolbar-dropdown-menu">
                <div className="toolbar-dropdown-item">More 1</div>
                <div className="toolbar-dropdown-item">More 2</div>
                <div className="toolbar-dropdown-item">More 3</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
