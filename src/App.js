import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { text: "Learn React", done: false },
        { text: "Build React", done: false }
      ],
      text: "",
      archived: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleArchived = this.handleArchived.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return (
      <div className="Apple">
        <header>
          <h1 className="App-title">React Todo List</h1>
        </header>
        <a href="#archive" onClick = { this.handleArchived }>Archive</a>
        <TodoList items = { this.state.items } onChange={(event, index) => this.handleCheckbox(event, index)}/>
        <form onSubmit = { this.handleSubmit }>
          <input type = "text" onChange = { this.handleInputChange } value = { this.state.text }/>
          <button type = "submit">Add me!</button>
        </form>
        <ArchiedList archived = { this.state.archived }/>

      </div>

    );
  }

  handleInputChange(e) {
    this.setState({"text": e.target.value});
  }

  handleArchived(e) {
    e.preventDefault();
    
    const doneItems = this.state.items.filter((item) => item.done);
    if (doneItems.length) {
      this.setState({ archived: this.state.archived.concat(doneItems) })
    }

    const notDone = this.state.items.filter((item) => !item.done);
    this.setState({items: notDone});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.text === "") return;

    const newItem = { text: this.state.text, done: false };
    const arr = this.state.items.concat(newItem);

    this.setState({ items: arr, text: "" });

  }

  handleCheckbox(event, index) {
    console.log(index + ", checked: " + event.target.checked);
    const updated = this.state.items.map((item, i) => {
      if (i === index) {
        const text = item.text;
        return {text: text, done: event.target.checked}
      }
      return item;
    });
    this.setState({items: updated});
  }
}

class ArchiedList extends Component {
  render() {
    return (
      <ul>
        {this.props.archived.map((item, index) => {
          return (
            <li key = { index }>
              <span>{ item.text }</span>
            </li>
          )
        })}
      </ul>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <div>
        <a>{this.getRemaining()} todos of {this.props.items.length}</a>
        <ul>
          {this.props.items.map((list, index) => {
            console.log("done? ", list.done);
            return (
              <li key = { index }>
                <label>
                  <input type="checkbox" onChange = { (event) => this.props.onChange(event, index) } checked = { list.done }/>
                  <span>{list.text}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    );
  };

  getRemaining() {
    return this.props.items.filter((item) => !item.done).length;
  }
}
export default App;
