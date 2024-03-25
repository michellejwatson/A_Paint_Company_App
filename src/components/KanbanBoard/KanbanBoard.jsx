import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from '../StatusColumn/StatusColumn';
import './KanbanBoard.css'; // Import the CSS file

export default function KanbanBoard() {
  // States for each column of kanban board 
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
        // Set paint statuses
        setAvailable(availablePaints);
        setRunningLow(runningLowPaints);
        setOutOfStock(outOfStockPaints);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    // Return PaintCard to StatusColumn if dropped outside the droppable area
    if (!destination) return; 
  
    // Create copies of the source and destination column for ordering
    let updatedAvailable = [...available];
    let updatedRunningLow = [...runningLow];
    let updatedOutOfStock = [...outOfStock];
  
    // Remove the PaintCard from the source column
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
  
    // Insert the PaintCard into the destination column
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
  
    // Update states based on the destination droppableId
    setAvailable(updatedAvailable);
    setRunningLow(updatedRunningLow);
    setOutOfStock(updatedOutOfStock);
  
    // Send updated column data to the Django backend to update paint status
    const colorToUpdate = draggableId;
    axios.post(
      `https://a-paint-company-a54db84c4060.herokuapp.com/api/post/${colorToUpdate}/`,
      {
        status: destination.droppableId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then(response => {
      console.log('Updated column data sent to backend:', response.data);
    })
    .catch(error => {
      console.error('Error updating column data:', error);
    });
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