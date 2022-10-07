import React, { useState, useEffect } from "react";
import Button from "../button";
//import Pagination from ".pagination";
import classes from "./style.module.css";
//import ".pagination.css"

const url = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
  	const [selectedTodo, setSelectedTodo] = useState();
	const [totalPage, setTotalPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);


	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((todos) => {
				setTodos(todos);
				setTotalPage(Math.ceil(todos.length /15));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const renderThead = () => {
		return (
			<thead>
				<tr>
					<th>id</th>
					<th>başlık</th>
					<th>durum</th>
					<th>Aksiyon</th>
				</tr>
			</thead>
		);
	};


  const remove = (todo) => {
    if (window.confirm("Silmek üzerisiniz emin misiniz")) {
      setTodos(prev => {
        return prev.filter(x => x.id != todo.id)
      })
    }
  }

  const edit = (todo) => {
    setSelectedTodo(todo);
  }

  const getDataWithPage = (page) => {
	// const start =(page-1) *15;
	// const end = start +15;
	return todos.slice((page-1) *15, page*15);
  }
	const renderBody = () => {
		return (
			<tbody>
				{getDataWithPage(currentPage).map((todo, index) => {
					return (
						<tr key={index}>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>{todo.completed ? "Tamamlandı" : "Yapılacak"}</td>
							<td>
								<Button
                  className={`btn btn-sm btn-danger ${classes.actionButton} `}
                  onClick={() => remove(todo)}
								>
									Sil
								</Button>
								<Button onClick={() => edit(todo)} className="btn btn-sm btn-warning">Düzenle</Button>
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	};


  const renderEditForm = () => {
    return (
      <div>
        <input type={"text"}/>
        <inpu type="check" />
        <Button>Kaydet</Button>
        <Button onClick={() => setSelectedTodo(undefined)}>Vazgeç</Button>
      </div>
    )
  }
	return (
    <div className={`${classes.container} container`}>
      { selectedTodo && renderEditForm()}
			<table className="table">
				{renderThead()}
        		{renderBody()}
			</table>
		<div className="d-flex justify-content-center">
			<Button onClick={() => setCurrentPage(currentPage-1)} disabled={currentPage == 1}>Önceki</Button>
			{Array.from({length:totalPage},(v, i)=> i+1).map((page)=>(
				<Button className={page===currentPage ? 'btn btn-primary' :'btn btn-outline-primary'}
				onClick={() => setCurrentPage(page)}>
					{page}
				</Button>
			))}
			<Button onClick={() => setCurrentPage(currentPage+1)} disabled={currentPage==totalPage}>Sonraki</Button>
		</div>
	</div>
	);
};

export default TodoList;
