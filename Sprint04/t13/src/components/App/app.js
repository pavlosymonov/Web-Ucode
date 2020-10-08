import React, { Component } from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import StatusFilter from '../status-filter';
import AddItemForm from '../add-item-form';

export default class App extends Component {
  
  maxId = 100;
  
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Build Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    term: '',
    filter: 'all' // all, active, done
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);
    const newItem = {...arr[idx], [propName]: !arr[idx][propName]};
    
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {todoData: this.toggleProperty(todoData, id, 'done')};
    });
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {todoData: this.toggleProperty(todoData, id, 'important')};
    });
  }

  deliteListItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArr = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArr
      };
    });
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      };
    });
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  search(items, term) {
    if (term) {
      return items.filter(item => item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1); 
    }
    return items;
  }

  filter(items, filterName) {
    switch (filterName) {
      case 'all':
        return items;
      case 'done':
        return items.filter(item => item.done);
      case 'active':
        return items.filter(item => !item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const vissibleItems = this.filter(
      this.search(todoData, term), filter
    );

    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <StatusFilter filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>
        <TodoList todos={vissibleItems}
          onDelited={this.deliteListItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant} />
        <AddItemForm onAdded={this.addItem} />
      </div>
    );
  }
};
