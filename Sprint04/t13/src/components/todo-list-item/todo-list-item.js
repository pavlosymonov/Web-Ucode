import React from 'react';
import './todo-list-item.css';

const TodoListItem = ({
  label, onDelited,
  onToggleImportant,
  onToggleDone,
  done, important }) => {

  let classNames = 'todo-list-item';

  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  return (
    <span className={classNames}>
      <span className="todo-list-item-label"
        onClick={ onToggleDone }>
        {label}
      </span>
      <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={ onToggleImportant }>
        <i className="fa fa-exclamation" />
      </button>
      <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={ onDelited }>
        <i className="fa fa-trash-o" />
      </button>
    </span>
  );
}

export default TodoListItem;