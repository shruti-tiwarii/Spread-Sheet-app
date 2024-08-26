import React from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';

interface CellProps {
  id: string;
  value: string | number;
  format?: {
    alignment?: 'left' | 'center' | 'right';
    fontSize?: number;
  };
  validation?: {
    isValid?: boolean;
    errorMessage?: string;
  };
}

const Cell: React.FC<CellProps> = ({ id, value, format, validation }) => {
  const { updateCell } = useSpreadsheetStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCell(id, event.target.value);
  };

  return (
    <div
      className="cell"
      style={{
        textAlign: format?.alignment || 'center',
        fontSize: format?.fontSize ? `${format.fontSize}px` : '14px',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          borderColor: validation?.isValid ? '#ddd' : 'red',
        }}
        title={validation?.errorMessage}
      />
    </div>
  );
};

export default Cell;
