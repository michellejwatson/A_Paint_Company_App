import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from '../StatusColumn/StatusColumn';
import './KanbanBoard.css'; // Import the CSS file

export default function KanbanBoard() {
  // States for each column of board 
  const [available, setAvailable] = useState([]);
  const [runningLow, setRunningLow] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);

  useEffect(() => {
    // Fetch paint info from backend using axios
    axios.get('https://a-paint-company-a54db84c4060.herokuapp.com/api/')
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

  const onDragEnd = result => {
    // ... Drag and drop logic
  };  

  return (
    <div className="kanban-board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          <StatusColumn title="AVAILABLE" paints={available} id={"available"}></StatusColumn>
          <StatusColumn title="RUNNING LOW" paints={runningLow} id={"running_low"}></StatusColumn>
          <StatusColumn title="OUT OF STOCK" paints={outOfStock} id={"out_of_stock"}></StatusColumn>
        </div>
      </DragDropContext>
    </div>
  );
}