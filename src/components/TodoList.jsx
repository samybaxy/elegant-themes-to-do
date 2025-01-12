import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onComplete, onDelete }) => {
    const renderTodos = () => {
        return todos.map(( todo, index ) => (
            <TodoItem key={index} id={index} {...todo} onComplete={onComplete} onDelete={onDelete} />
        ));
    };

    return <ul className="list-group todo-list">{renderTodos()}</ul>;
};

export default TodoList;