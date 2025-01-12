import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

function App() {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);

    // Similar to ComponentDidMount
    useEffect(() => {
        const savedTodos = localStorage.getItem( 'et-todos' );
        if ( savedTodos ) setTodos( JSON.parse( savedTodos ) )
    }, []);

    // Similar to ComponentDidUpdate
    useEffect(() => {
        localStorage.setItem( 'et-todos', JSON.stringify( todos ) )
    }, [todos]);

    const handleCompleteTodo = ( id ) => {
        setTodos(
            todos.map(( todo, index ) => 
                index === id ? { ...todo, complete: !todo.complete } : todo
            )
        );
    };

    const handleChangeTitle = ( event ) => {
        setTitle( event.target.value );
    };

    const handleEnterPressAdd = ( event ) => {
        if ( event.keyCode === 13 ) handleAddTodo();
    };

    const handleAddTodo = ( event ) => {
        if ( title.trim() ) {
            setTodos( [...todos, { title: title.trim(), complete: false }] );
            setTitle("");
        }
    }

    const handleDeleteTodo = ( id ) => {
        setTodos( todos.filter( (_, index) => index !== id ) );
    };

    const renderHeader = () => (
        <div className="todos-app-header card-header">
            <h2>ToDo</h2>
            <div className="input-group">
                <input
                    type="text"
                    name="title"
                    placeholder="What do you need to do?"
                    className="form-control add-new-todo"
                    onChange={handleChangeTitle}
                    onKeyDown={handleEnterPressAdd}
                    value={title}
                />
                <div className="input-group-append">
                    <button className="btn btn-success" type="button" onClick={handleAddTodo}>
                        <span style={{ fontSize: "24px", lineHeight: "16px", }}>+</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-6 offset-md-3 mt-2">
                    <div className="todos-app card">
                        {renderHeader()}
                        <div className="card-body">
                            <TodoList
                                todos={todos}
                                onComplete={handleCompleteTodo}
                                onDelete={handleDeleteTodo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

