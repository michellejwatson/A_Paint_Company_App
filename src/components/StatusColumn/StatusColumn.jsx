import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PaintCard from '../PaintCard/PaintCard';
import './StatusColumn.css';

export default function StatusColumn({ title, paints, id }) {
  return (
    <div className="status-column-container">
      <h4 className="status-column-title">{title}</h4>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div 
            className="droppable-area"
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {paints && paints.map((paint, index) => (
              <PaintCard key={paint.colour} paint={paint} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}