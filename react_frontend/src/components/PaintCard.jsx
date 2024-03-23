import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export default function PaintCard({paint, index}) {
  return (
    <div
      style={{
        padding: '8px',
        color: 'white',
      }}
    >
      <Draggable draggableId={`${paint.colour}`} key={paint.colour} index={index}>
        {(provided, snapshot) => (
          <div style={{display: 'flex', justifyContent: 'start', padding: 2}}>
            {paint.colour}
            {paint.inventory}
          </div>
        )}
      </Draggable>
    </div>
  )
}
