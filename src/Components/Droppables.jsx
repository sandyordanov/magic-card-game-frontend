import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableDeck = ({ cards, onDrop, children }) => {
    const [, drop] = useDrop({
        accept: 'OWNED_CARD',
        drop: (item) => onDrop(item.id),
    });

    return (
        <div ref={drop} className="row">
            {children(cards)}
        </div>
    );
};

const DroppableOwnedCards = ({ cards, onDrop, children }) => {
    const [, drop] = useDrop({
        accept: 'DECK_CARD',
        drop: (item) => onDrop(item.id),
    });

    return (
        <div ref={drop} className="row">
            {children(cards)}
        </div>
    );
};

export { DroppableDeck, DroppableOwnedCards };
