import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './PaintCard.css'; // Import the CSS file

// Mapping paint colours to background colours
const colorMap = {
  'Blue': '#003D80',
  'Grey': '#555555',
  'Black': '#000000',
  'White': '#FFFFFF',
  'Purple': '#472F5B',
};

export default function PaintCard({ paint, index }) {
  const colourValue = colorMap[paint.colour] || paint.colour;
  const [editable, setEditable] = useState(false);
  const [editedInventory, setEditedInventory] = useState(paint.inventory);

  useEffect(() => {
    // Check if user groups contain 'Managers', 'Admin', or 'Painters'
    const userGroups = JSON.parse(localStorage.getItem('user_groups') || '[]');
    const authorized = userGroups.includes('Managers') || userGroups.includes('Admin') || userGroups.includes('Painters');
    setEditable(authorized);
  }, []);

  const handleInventoryChange = (e) => {
    const newInventory = e.target.value;
    setEditedInventory(newInventory);

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
    <Draggable draggableId={paint.colour} key={paint.colour} index={index} isDragDisabled={!editable}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          
        >
          <div className="paint-card" style={{ borderLeft: `25px solid ${colourValue}` }}>
            <div className="paint-card-color">{paint.colour}</div>
            <div className="paint-card-inventory">Inventory:
              <input
                type="number"
                value={editedInventory}
                onChange={handleInventoryChange}
                readOnly={!editable}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}