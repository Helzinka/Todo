import { submit } from "./checkValues.js"
import {
	removeLocalStorage,
	setLocalStorage,
	getAllLocalStorage,
	getLengthLocalStorage,
	getLocalStorage,
} from "./storage.js"

export const removeTodo = () => {
	for (const item of document.querySelectorAll(".delete")) {
		item.addEventListener("click", function () {
			let key = this.parentNode.parentNode.querySelector(".title").textContent
			removeLocalStorage(key)
			this.parentNode.parentNode.remove()
		})
	}
	getCountTodos()
}

export const getCountTodos = () => {
	document.querySelector("#count_todo").textContent =
		getLengthLocalStorage().data || "0"
}

export const createTodo = (item) => {
	let { result, data } = submit(item)
	if (result) {
		setLocalStorage(data.key, data, false)
		let templateTodo = `
            <div class="card" data-key=${data.key}>
                <div class="completed_container">
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
                            <span>${data.due_date}</span>
                        </div>
                        <div class="autor">
                            <i class="fa-regular fa-user"></i>
                            <span>${data.assign_to}</span>
                        </div>
                    </div>
                </div>
                <div class="crud">
                    <div class="edit"><i class="fa-regular fa-pen-to-square"></i></div>
                    <div class="move"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
                    <div class="delete"><i class="fa-regular fa-trash-can"></i></div>
                </div>
            </div>
    `
		document.querySelector("#content").innerHTML += templateTodo
		getCountTodos()
		removeTodo()
		editModal()
	}
}

export const getAllTodos = () => {
	const { result, data } = getAllLocalStorage()
	if (result) {
		data.map((e) => {
			let templateTodo = `
                    <div class="card" data-key=${e.key}>
                        <div class="completed_container">
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
                                    <span>${e.due_date}</span>
                                </div>
                                <div class="autor">
                                    <i class="fa-regular fa-user"></i>
                                    <span>${e.assign_to}</span>
                                </div>
                            </div>
                        </div>
                        <div class="crud">
                            <div class="edit"><i class="fa-regular fa-pen-to-square"></i></div>
                            <div class="move"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
                            <div class="delete"><i class="fa-regular fa-trash-can"></i></div>
                        </div>
                    </div>
                    `
			document.querySelector("#content").innerHTML += templateTodo
		})
	}
	getCountTodos()
	removeTodo()
	editModal()
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
	console.log(data)
	setLocalStorage(data.key, item, true)
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
