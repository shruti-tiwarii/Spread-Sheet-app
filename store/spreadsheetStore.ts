import { create } from 'zustand';

type CellFormat = {
  alignment?: 'left' | 'center' | 'right';
  fontSize?: number;
};

type CellValidation = {
  isValid?: boolean;
  errorMessage?: string;
};

type Cell = {
  value: string | number;
  format?: CellFormat;
  validation?: CellValidation;
};

type HistoryStep = {
  cells: Record<string, Cell>;
};

interface SpreadsheetState {
  cells: Record<string, Cell>;
  history: HistoryStep[];
  currentStep: number;
  updateCell: (id: string, value: string | number) => void;
  formatCell: (id: string, format: CellFormat) => void;
  validateCell: (id: string, validation: CellValidation) => void;
  undo: () => void;
  redo: () => void;
}

export const useSpreadsheetStore = create<SpreadsheetState>((set) => {
  const initialCells: Record<string, Cell> = {};
  for (let i = 0; i < 1000; i++) {
    initialCells[`cell-${i}`] = { value: '' };
  }

  return {
    cells: initialCells,
    history: [],
    currentStep: -1,

    updateCell: (id, value) => {
      set((state) => {
        const newCells = {
          ...state.cells,
          [id]: {
            ...state.cells[id],
            value: value,
          },
        };
        const newHistory = [
          ...state.history.slice(0, state.currentStep + 1),
          { cells: newCells },
        ];
        return {
          cells: newCells,
          history: newHistory,
          currentStep: newHistory.length - 1,
        };
      });
    },

    formatCell: (id, format) => {
      set((state) => {
        const newCells = {
          ...state.cells,
          [id]: {
            ...state.cells[id],
            format: { ...state.cells[id]?.format, ...format },
          },
        };
        const newHistory = [
          ...state.history.slice(0, state.currentStep + 1),
          { cells: newCells },
        ];
        return {
          cells: newCells,
          history: newHistory,
          currentStep: newHistory.length - 1,
        };
      });
    },

    validateCell: (id, validation) => {
      set((state) => {
        const newCells = {
          ...state.cells,
          [id]: {
            ...state.cells[id],
            validation: { ...state.cells[id]?.validation, ...validation },
          },
        };
        const newHistory = [
          ...state.history.slice(0, state.currentStep + 1),
          { cells: newCells },
        ];
        return {
          cells: newCells,
          history: newHistory,
          currentStep: newHistory.length - 1,
        };
      });
    },

    undo: () => {
      set((state) => {
        const prevStep = state.currentStep - 1;
        if (prevStep >= 0) {
          return {
            cells: state.history[prevStep].cells,
            currentStep: prevStep,
          };
        }
        return state;
      });
    },

    redo: () => {
      set((state) => {
        const nextStep = state.currentStep + 1;
        if (nextStep < state.history.length) {
          return {
            cells: state.history[nextStep].cells,
            currentStep: nextStep,
          };
        }
        return state;
      });
    },
  };
});
