import { submit } from "./checkValues.js"
import {
	removeLocalStorage,
	setLocalStorage,
	getAllLocalStorage,
	getLengthLocalStorage,
	getLocalStorage,
} from "./storage.js"

export const completed = () => {
	for (const item of document.querySelectorAll(".completed")) {
		item.addEventListener("click", function () {
			let isChecked = this.checked
			let key = this.parentNode.parentNode.parentNode.getAttribute("data-key")
			if (isChecked) {
				let { data } = getLocalStorage(key)
				data.completed = isChecked
				setLocalStorage(key, data, true)
			}
		})
	}
}

export const getCountTodos = () => {
	const { data } = getAllLocalStorage()
	let completed = data.filter((e) => e.completed === true).length
	let not_completed = data.filter((e) => e.completed === false).length
	document.querySelector("#count_todo").textContent = not_completed
	document.querySelector("#count_completed").textContent = completed
}

export const removeTodo = () => {
	for (const item of document.querySelectorAll(".delete")) {
		item.addEventListener("click", function () {
			let key = this.parentNode.parentNode.getAttribute("data-key")
			removeLocalStorage(key)
			this.parentNode.parentNode.remove()
			getCountTodos()
		})
	}
}

export const createTodo = (item) => {
	let { result, data, error } = submit(item)
	if (result) {
		setLocalStorage(data.key, data, false)
		let templateTodo = `
		<div class="card" data-key=${data.key}>
		<div class="container">
			<div class="check">
				<input
					type="checkbox"
					class="completed"
				/>
				<label for="checkbox"></label>
			</div>
			<div class="content">
				<div class="title">${data.title}</div>
				<div class="description">${data.desc}</div>
				<div class="meta">
					<div class="date">
						<i class="fa-regular fa-calendar"></i>
						<span class="due_date">${data.due_date}</span>
					</div>
					<div class="autor">
						<i class="fa-regular fa-user"></i>
						<span class="assign_to">${data.assign_to}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="crud">
			<div class="edit">
				<i class="fa-regular fa-pen-to-square"></i>
			</div>
			<div class="delete"><i class="fa-regular fa-trash-can"></i></div>
		</div>
	</div>
    `
		document.querySelector("#content").innerHTML += templateTodo
		getCountTodos()
		removeTodo()
		editModal()
		completed()
	}
}

export const getAllTodos = (isCompleted = false) => {
	const { result, data } = getAllLocalStorage()
	if (result) {
		document.querySelector("#content").innerHTML = ""
		data.filter((item) => item.completed === isCompleted).map((e) => {
			let templateTodo = `
			<div class="card" data-key=${e.key}>
			<div class="container">
				<div class="check">
					<input
						type="checkbox"
						class="completed"
					/>
					<label for="checkbox"></label>
				</div>
				<div class="content">
					<div class="title">${e.title}</div>
					<div class="description">${e.desc}</div>
					<div class="meta">
						<div class="date">
							<i class="fa-regular fa-calendar"></i>
							<span class="due_date">${e.due_date}</span>
						</div>
						<div class="autor">
							<i class="fa-regular fa-user"></i>
							<span class="assign_to">${e.assign_to}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="crud">
				<div class="edit">
					<i class="fa-regular fa-pen-to-square"></i>
				</div>
				<div class="delete"><i class="fa-regular fa-trash-can"></i></div>
			</div>
		</div>
                    `
			document.querySelector("#content").innerHTML += templateTodo
		})
		getCountTodos()
		removeTodo()
		editModal()
		completed()
	}
}

export const editModal = () => {
	for (const item of document.querySelectorAll(".edit")) {
		item.addEventListener("click", function () {
			let key = this.parentNode.parentNode.getAttribute("data-key")
			let { result, data } = getLocalStorage(key)
			if (result) {
				document.querySelector("#modal").className = ""
				document.querySelector("#modal").setAttribute("data-key", key)
				document.querySelector("#titleModal").value = data.title
				document.querySelector("#descModal").value = data.desc
				document.querySelector("#dateModal").value = data.due_date
				document.querySelector("#autorModal").value = data.assign_to
				document.querySelector(".btn_add").textContent = "Update"
				document.querySelector(".btn_add").className = "btn_update"
			}
		})
	}
}

export const updateTodo = (item) => {
	let key = document.querySelector("#modal").getAttribute("data-key")
	let { result, data } = submit(item, key)
	if (result) {
		setLocalStorage(data.key, item, true)
		for (const item of document.querySelectorAll(".card")) {
			if (item.getAttribute("data-key") === key) {
				item.querySelector(".title").textContent = data.title
				item.querySelector(".description").textContent = data.desc
				item.querySelector(".due_date").textContent = data.due_date
				item.querySelector(".assign_to").textContent = data.assign_to
			}
		}
	}
}

export const clearModal = () => {
	document.querySelector("#modal").setAttribute("data-key", "")
	document.querySelector("#titleModal").value = ""
	document.querySelector("#descModal").value = ""
	document.querySelector("#dateModal").value = ""
	document.querySelector("#autorModal").value = ""
	document.querySelector(".btn_update").textContent = "Add"
	document.querySelector(".btn_update").className = "btn_add"
}
