import React from 'react';

const TodoItem = ( {id, title, complete, onComplete, onDelete} ) => {
    const handleCompleteCheck = () => {
        onComplete( id );
    };
    
    const handleDelete = () => {
        onDelete( id );
    };
};