import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios'; // Import axios

// Mapping paint colours to background colours
const colorMap = {
  'Blue': '#003D80',
  'Grey': '#555555',
  'Black': '#000000',
  'White': '#FFFFFF',
  'Purple': '#472F5B',
};

export default function PaintCard({ paint, index }) {
  // If colour is not found in map, use default colour 
  const colourValue = colorMap[paint.colour] || paint.colour;
  const cardStyle = {
    padding: '8px',
    color: 'black',
    width: '200px',
    height: '80px',
    borderLeft: `25px solid ${colourValue}`, // Colored left border
    background: '#C6D8D9',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '15px',
  };

  // State to manage the edited inventory value
  const [editedInventory, setEditedInventory] = useState(paint.inventory);

  // Function to handle changes in inventory input
  const handleInventoryChange = (e) => {
    const newInventory = e.target.value;
    setEditedInventory(newInventory);

    // Send updated inventory data to the Django backend
    axios.post(`https://a-paint-company-a54db84c4060.herokuapp.com/api/post/${paint.colour}/`, {
      inventory: newInventory,
    })
      .then(response => {
        console.log('Updated inventory data sent to backend:', response.data);
      })
      .catch(error => {
        console.error('Error updating inventory data:', error);
      });
  };

  return (
    <Draggable draggableId={paint.colour} key={paint.colour} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div style={cardStyle}>
            <div style={{ fontWeight: 'bold' }}>{paint.colour}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>Inventory:
              <input
                type="number"
                value={editedInventory}
                onChange={handleInventoryChange}
                style={{
                  marginLeft: '5px',
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  padding: '2px',
                  background: 'none',
                  border: 'none',
                  fontSize: 'inherit',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
