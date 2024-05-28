import React from 'react';
import { useDrag } from 'react-dnd';
import Card from "./Card.jsx";

const DraggableCard = ({ card, type }) => {
    const [{ isDragging }, drag] = useDrag({
        type,
        item: { id: card.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <Card {...card} />
        </div>
    );
};

export default DraggableCard;
