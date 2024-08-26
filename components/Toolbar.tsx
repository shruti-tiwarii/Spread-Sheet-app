import React, { useState } from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';

interface ToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onUndo, onRedo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [format, setFormat] = useState<string>('');
  const [validationRule, setValidationRule] = useState<string>('');
  const { cells, formatCell, validateCell } = useSpreadsheetStore();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      console.log('Search term is empty.');
      return;
    }

    const results = Object.entries(cells).filter(([id, cell]) => {
      const cellValue = cell.value?.toString().toLowerCase() || '';
      const searchTermLower = searchTerm.toLowerCase();
      return cellValue.includes(searchTermLower);
    });

    if (results.length === 0) {
      console.log('No results found.');
    } else {
      console.log('Search Results:', results);
    }
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormat = e.target.value;
    setFormat(newFormat);
    Object.keys(cells).forEach(id => formatCell(id, { fontSize: parseInt(newFormat) }));
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValidationRule = e.target.value;
    setValidationRule(newValidationRule);
    Object.keys(cells).forEach(id => validateCell(id, { isValid: newValidationRule === 'required' }));
  };

  return (
    <div className="toolbar">
      <button onClick={onUndo}>Undo</button>
      <button onClick={onRedo}>Redo</button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="format-container">
        <label htmlFor="format-select">Font Size:</label>
        <select id="format-select" value={format} onChange={handleFormatChange} className="format-select">
          <option value="">Select Font Size</option>
          <option value="12">12px</option>
          <option value="14">14px</option>
          <option value="16">16px</option>
          <option value="18">18px</option>
        </select>
      </div>
      <div className="validation-container">
        <label htmlFor="validation-select">Validation:</label>
        <select id="validation-select" value={validationRule} onChange={handleValidationChange} className="validation-select">
          <option value="">Select Validation</option>
          <option value="required">Required</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
