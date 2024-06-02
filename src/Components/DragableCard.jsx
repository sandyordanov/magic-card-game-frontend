import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import Card from "./Card.jsx";

const DraggableCard = ({ card, type }) => {
    const cardRef = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag({
        type,
        item: { id: card.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    useEffect(() => {
        if (cardRef.current) {
            const cardElement = cardRef.current;

            const clone = cardElement.cloneNode(true);
            clone.style.width = `${cardElement.offsetWidth}px`;
            clone.style.height = `${cardElement.offsetHeight}px`;
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            document.body.appendChild(clone);

            preview(clone, {
                anchorX: 0,
                anchorY: 0,
                offsetX: cardElement.offsetWidth / 2,
                offsetY: cardElement.offsetHeight / 2,
            });

            return () => {
                document.body.removeChild(clone);
            };
        }
    }, [preview]);

    return (
        <div
            ref={drag}
            style={{
                cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
                boxShadow: isDragging ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
                transform: isDragging ? 'scale(1.05)' : 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                borderRadius: '17px', // Ensure the card has rounded borders
                overflow: 'hidden' // Hide any overflow to maintain rounded corners
            }}
        >
            <div ref={cardRef}>
                <Card {...card} />
            </div>
        </div>
    );
};

export default DraggableCard;
