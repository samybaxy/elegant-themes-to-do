import React from 'react';

const TodoItem = ( {id, title, complete, onComplete, onDelete} ) => {
    const handleCompleteCheck = () => {
        onComplete( id );
    };
    
    const handleDelete = () => {
        onDelete( id );
    };

    return (
        <li className="list-group-item todo-item">
            <div className="row">
                <div className="col-2 todo-item__checkbox">
                    <input 
                        type="checkbox" 
                        className="form-control" 
                        checked={complete}
                        onChange={handleCompleteCheck}
                    />
                </div>
                <div className="col-8 todo-item__title">
                    <h3>{title}</h3>
                </div>
                <div className="col-2">
                    <button onClick={handleDelete} className="btn btn-danger">X</button>
                </div>
            </div>
        </li>
    );
};

export default TodoItem;