import React, { useState, useMemo } from 'react';
import { useSpreadsheetStore } from '../store/spreadsheetStore';
import Cell from './Cell';

const CELL_SIZE = 50; // Example cell size
const GRID_COLUMNS = 10;
const CELLS_PER_PAGE = 100;

const SpreadsheetGrid = () => {
  const { cells } = useSpreadsheetStore();
  const [currentPage, setCurrentPage] = useState(0);

  const getCurrentPageCells = (pageNumber: number) => {
    const startIndex = pageNumber * CELLS_PER_PAGE;
    const endIndex = startIndex + CELLS_PER_PAGE;
    return Object.entries(cells).slice(startIndex, endIndex);
  };

  const pageCells = useMemo(() => getCurrentPageCells(currentPage), [cells, currentPage]);

  const totalPages = Math.ceil(Object.keys(cells).length / CELLS_PER_PAGE);

  return (
    <div>
      <div className="grid-container">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${CELL_SIZE}px)` }}>
          {pageCells.length > 0 ? (
            pageCells.map(([id, cell]) => (
              <Cell
                key={id}
                id={id}
                value={cell.value}
                format={cell.format}
                validation={cell.validation}
              />
            ))
          ) : (
            <div>No cells to display.</div>
          )}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetGrid;
