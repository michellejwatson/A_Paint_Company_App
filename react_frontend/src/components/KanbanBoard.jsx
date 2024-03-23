import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import PaintCard from './PaintCard';
import StatusColumn from './StatusColumn';

export default function KanbanBoard() {
  // States for each column of board 
  const [available, setAvailable] = useState([]);
  const [runningLow, setRunningLow] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    // Fetch paint info from backend using axios
    axios.get('http://localhost:8000/api/')
      .then(response => {
        // Organize paints based on their status
        const availablePaints = response.data.filter(paint => paint.status === 'available');
        const runningLowPaints = response.data.filter(paint => paint.status === 'running_low');
        const outOfStockPaints = response.data.filter(paint => paint.status === 'out_of_stock');
        setAvailable(availablePaints);
        setRunningLow(runningLowPaints);
        setOutOfStock(outOfStockPaints);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Paint Status Board</h2>
      <DragDropContext>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 20, // Add space between columns
        }}>
          <StatusColumn title="Available" paints={available} id={"available"}></StatusColumn>
          <StatusColumn title="Running Low" paints={runningLow} id={"running_low"}></StatusColumn>
          <StatusColumn title="Out of Stock" paints={outOfStock} id={"out_of_stock"}></StatusColumn>
        </div>
      </DragDropContext>
    </div>
  );
}