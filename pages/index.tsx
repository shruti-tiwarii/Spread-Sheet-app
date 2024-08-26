import React from 'react';
import SpreadsheetGrid from '../components/SpreadsheetGrid';
import Toolbar from '../components/Toolbar';
import { useSpreadsheetStore } from '../store/spreadsheetStore';

const Home: React.FC = () => {
  const { undo, redo } = useSpreadsheetStore();

  return (
    <div className="container">
      <Toolbar onUndo={undo} onRedo={redo} />
      <SpreadsheetGrid />
    </div>
  );
};

export default Home;
