import React, { useState } from '@theia/core/shared/react';

const Toolbar = () => {
  const [dropdown1Value, setDropdown1Value] = useState('Option 1');
  const [dropdown2Value, setDropdown2Value] = useState('More 1');

  const handleDropdown1Change = (e: any) => {
    setDropdown1Value(e.target.value);
  };

  const handleDropdown2Change = (e: any) => {
    setDropdown2Value(e.target.value);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="toolbar-dropdowns">
          <div className="toolbar-dropdown-container">
            <select
              className="toolbar-select"
              value={dropdown1Value}
              onChange={handleDropdown1Change}
            >
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>

          <div className="toolbar-dropdown-container">
            <select
              className="toolbar-select"
              value={dropdown2Value}
              onChange={handleDropdown2Change}
            >
              <option value="More 1">More 1</option>
              <option value="More 2">More 2</option>
              <option value="More 3">More 3</option>
            </select>
          </div>
        </div>

        <div className="toolbar-buttons">
          <button className="toolbar-button" aria-label="Settings">
            <p className="toolbar-text-button">XR</p>
          </button>
          <button className="toolbar-button" aria-label="Add">
            <p className="toolbar-text-button">C</p>
          </button>
          <button className="toolbar-button-active" aria-label="Remove">
            <p className="toolbar-text-button-active">AN</p>
          </button>
          <button className="toolbar-button" aria-label="Search">
            <p className="toolbar-text-button">FN</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
