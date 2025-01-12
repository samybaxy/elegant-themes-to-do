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
}

export default App;

