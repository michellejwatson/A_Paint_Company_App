import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PaintCard from './PaintCard';

export default function StatusColumn({ title, paints, id }) {
  return (
    <div style={{flex: 1, minWidth: 300}}>
      <h4 style={{color: '#472F5B', backgroundColor: '#C6D8D9', borderRadius: '10px', padding: '5px', margin: '10px 0'}}>
        {title}
      </h4>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#526863',
            minHeight: 500,
            flexGrow: 1,
            alignItems: 'center',
          }}
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