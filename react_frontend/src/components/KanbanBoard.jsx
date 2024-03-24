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

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // Return if dropped outside the droppable area
  
    // Create copies of the source and destination column
    let updatedAvailable = [...available];
    let updatedRunningLow = [...runningLow];
    let updatedOutOfStock = [...outOfStock];
  
    // Remove the paint card from the source column
    const [removed] = (() => {
      switch (source.droppableId) {
        case 'available':
          return updatedAvailable.splice(source.index, 1);
        case 'running_low':
          return updatedRunningLow.splice(source.index, 1);
        case 'out_of_stock':
          return updatedOutOfStock.splice(source.index, 1);
        default:
          return [];
      }
    })();
  
    // Insert the paint card into the destination column
    switch (destination.droppableId) {
      case 'available':
        updatedAvailable.splice(destination.index, 0, removed);
        break;
      case 'running_low':
        updatedRunningLow.splice(destination.index, 0, removed);
        break;
      case 'out_of_stock':
        updatedOutOfStock.splice(destination.index, 0, removed);
        break;
      default:
        break;
    }
  
    // Update state based on the destination droppableId
    setAvailable(updatedAvailable);
    setRunningLow(updatedRunningLow);
    setOutOfStock(updatedOutOfStock);
  
    // Send updated column data to the Django backend
    const colorToUpdate = draggableId;
    axios.post(`http://localhost:8000/api/post/${colorToUpdate}/`, {
      status: destination.droppableId,
    })
    .then(response => {
      console.log('Updated column data sent to backend:', response.data);
    })
    .catch(error => {
      console.error('Error updating column data:', error);
    });
  };  

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <h2 style={{color: '#472F5B'}}>PAINT STATUS</h2>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 20, // Add space between columns
        }}>
          <StatusColumn title="AVAILABLE" paints={available} id={"available"}></StatusColumn>
          <StatusColumn title="RUNNING LOW" paints={runningLow} id={"running_low"}></StatusColumn>
          <StatusColumn title="OUT OF STOCK" paints={outOfStock} id={"out_of_stock"}></StatusColumn>
        </div>
      </DragDropContext>
    </div>
  );
}