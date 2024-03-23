import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PaintCard from './PaintCard';

export default function StatusColumn({ title, paints, id }) {
  return (
    <div style={{flex: 1, minWidth: 300}}>
      <h4>{title}</h4>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#8F79A1',
        minHeight: 500,
        flexGrow: 1,
      }}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {paints && paints.map((paint, index) => (
                <div key={paint.colour}>
                  <PaintCard paint={paint} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}