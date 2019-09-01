import React, { useState, useEffect } from 'react';
import './App.css';

const flex = {
	display: 'flex',
	justifyContent: 'space-between',
	margin: '0 auto'
};

const mainInput = {
	border: '1px solid dodgerblue',
	fontSize: '22px',
	width: '100%',
	padding: '5px 10px',
	marginBottom: '20px'
};

const AddTodo = ({ addTodo }) => {
	const [task, setTask] = useState('');

	const handleChange = ({ target: { value } }) => {
		console.log('handleChange check...', task);
		if (!value || !value.trim()) return;
		setTask(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(task, 'task handleSubmit...');
		addTodo(task);
		setTask('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input style={mainInput} value={task} type="text" placeholder="Todos..." onChange={handleChange} />
		</form>
	);
};

export default function App(props) {
	const [todos, setTodos] = useState([
		{
			todo: 'Read about react hooks',
			status: false
		},
		{
			todo: 'Watch youtube tutorial',
			status: false
		},
		{
			todo: 'Go to the market',
			status: false
		}
	]);

	// addTodo function to add new todos
	const addTodo = task => {
		setTodos([...todos, { todo: task, status: false }]);
	};

	// deleteTodo function to delete the todos
	const deleteTodo = index => {
		let newTodos = [...todos];
		console.log(newTodos, 'newTodos');
		setTodos(
			newTodos.filter((todo, i) => {
				if (i === index) {
					return;
				}
				return todo;
			})
		);
	};

	// handleCheck function to set the status to todos
	const handleCheck = index => {
		setTodos(
			todos.map((todo, i) => {
				if (i === index) {
					return {
						todo: todo.todo,
						status: !todo.status
					};
				}
				return todo;
			})
		);
	};

	const deleteChecked = () => {
		setTodos(
			todos.filter((todo, i) => {
				if (todo.status) {
					return;
				}
				return todo;
			})
		);
	};

	const deleteUnchecked = () => {
		setTodos(
			todos.filter((todo, i) => {
				if (!todo.status) {
					return;
				}
				return todo;
			})
		);
	};

	return (
		<div className="App">
			<AddTodo addTodo={addTodo} />
			<ul>
				{todos.map((tasks, index) => (
					<li key={index} style={flex}>
						<h3>{tasks.todo}</h3>
						<div>
							<input type="checkbox" checked={tasks.status} onChange={() => handleCheck(index)} />
							<span onClick={() => deleteTodo(index)}>X</span>
						</div>
					</li>
				))}
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<button onClick={deleteChecked}>Delete compleated</button>
					<button onClick={deleteUnchecked}>Delete uncompleted</button>
				</div>
			</ul>
		</div>
	);
}
