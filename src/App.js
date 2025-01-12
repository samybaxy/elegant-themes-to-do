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
}

export default App;

