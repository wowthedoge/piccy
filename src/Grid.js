import React, { useState, useEffect } from 'react';

import './App.css';

const Grid = () => {

    const squareSizePx = 20;
    const gridLengthInSquares = 80;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleKeyDown = (event) => {
            setPosition((prev) => {
                let newX = prev.x;
                let newY = prev.y;

                if (event.key === 'ArrowLeft') {
                    newX = Math.max(prev.x - 1, 0);
                } else if (event.key === 'ArrowRight') {
                    newX = Math.min(prev.x + 1, gridLengthInSquares - 1);
                } else if (event.key === 'ArrowUp') {
                    newY = Math.max(prev.y - 1, 0);
                } else if (event.key === 'ArrowDown') {
                    newY = Math.min(prev.y + 1, gridLengthInSquares - 1);
                }

                return { x: newX, y: newY };
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const getDistanceToCenterCss = () => {
        const distances = {};

        if (position.x < (gridLengthInSquares / 2)) {
            distances['left'] = `${Math.round(window.innerWidth / 2) - (position.x * squareSizePx) - squareSizePx / 2}px`;
        } else {
            distances['right'] = `${Math.round(window.innerWidth / 2) - ((gridLengthInSquares - 1 - position.x) * squareSizePx) - squareSizePx / 2}px`;
        }

        if (position.y < (gridLengthInSquares / 2)) {
            distances['top'] = `${Math.round(window.innerHeight / 2) - (position.y * squareSizePx) - squareSizePx / 2}px`;
        } else {
            distances['bottom'] = `${Math.round(window.innerHeight / 2) - ((gridLengthInSquares - 1 - position.y)* squareSizePx) - squareSizePx / 2}px`;
        }

        return distances;
    };

    return (
        <div className="viewport">
            <div className="grid" style={getDistanceToCenterCss()}>
                {Array.from({ length: gridLengthInSquares }).map((_, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {Array.from({ length: gridLengthInSquares }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className={`square ${position.x === colIndex && position.y === rowIndex ? 'selected' : ''}`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Grid;
