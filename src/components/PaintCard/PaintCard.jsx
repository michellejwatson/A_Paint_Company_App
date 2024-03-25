import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './PaintCard.css'; // Import the CSS file

// Mapping default paint colours to preferred colours for colour on PaintCard
const colorMap = {
  'Blue': '#003D80',
  'Grey': '#555555',
  'Black': '#000000',
  'White': '#FFFFFF',
  'Purple': '#472F5B',
};

export default function PaintCard({ paint, index }) {
  // Set colourValue, if mapping value doesn't exist then use default 
  const colourValue = colorMap[paint.colour] || paint.colour;
  const [editableInventory, setEditableInventory] = useState(false);
  const [editableStatus, setEditableStatus] = useState(false);
  const [editedInventory, setEditedInventory] = useState(paint.inventory);

  useEffect(() => {
    // Retrieve user groups from storage
    const userGroups = JSON.parse(localStorage.getItem('user_groups') || '[]');
    // If user is in Painters, Managers or Admin groups, then allow updating of inventory
    const authorizedInventory = userGroups.includes('Managers') || userGroups.includes('Admin') || userGroups.includes('Painters');
    setEditableInventory(authorizedInventory);
    // If user is in Managers or Admin groups, then allow moving of PaintCards
    const authorizedStatus = userGroups.includes('Managers') || userGroups.includes('Admin');
    setEditableStatus(authorizedStatus);
  }, []);

  // Function to handle if inventory value is edited
  const handleInventoryChange = (e) => {
    const newInventory = e.target.value;
    // Update inventory value
    setEditedInventory(newInventory);

    // Send post request with new inventory value using axios
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
    <Draggable draggableId={paint.colour} key={paint.colour} index={index} isDragDisabled={!editableStatus}>
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
                readOnly={!editableInventory}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}