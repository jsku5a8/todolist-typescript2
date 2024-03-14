import axios from "axios";
import { useState, useEffect } from "react";
const url =
	"https://api.elchocrud.pro/api/v1/50fc89e1e34f5340e607b8376f77956e/todolist";

const TodoForm = () => {
	const [todo, setTodo] = useState([]);
	const [data, setData] = useState("");

	const getRequest = async () => {
		const response = await axios.get(url);
		setTodo(response.data);
	};
	useEffect(() => {
		getRequest();
	}, []);

	const addTodoHandler = async () => {
		const newData = {
			data: data,
		};
		const response = await axios.post(url, newData);
		setTodo(response.data);
		setData("");
	};

	const Delete = async (_id) => {
		const response = await axios.delete(`${url}/${_id}`);
		setTodo(response.data);
	};

	return (
		<form>
			<input
				type="text"
				placeholder="Введите текст"
				value={data}
				onChange={(e) => setData(e.target.value)}
			/>
			<button onClick={addTodoHandler}>add</button>
			{todo.map((item, index) => (
				<div key={index}>
					<p>{item.data}</p>
					<button onClick={() => Delete(item._id)}>delete</button>
				</div>
			))}
		</form>
	);
};

export default TodoForm;
