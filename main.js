import { createTodo, getAllTodos, clearModal, updateTodo } from "./utils/crud.js"

// '$' Alias for document.querySelector
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Selectors

const Add = $(".add") // btn_add header
const Modal = $("#modal") // modal below main app
const Cancel_btn = $(".btn_cancel") // cancel btn in modal
const Contact_form = $("#contact_form") // event submit on form

// Get todo from db
getAllTodos()

//get the date of today
// let date = new Date()

// Display a task modal from add button
let is_modal_open = false

Add.addEventListener("click", () => {
	if (!is_modal_open) {
		Modal.className = ""
		is_modal_open = true
	}
})

// Hide task modal if #candel is performed
Cancel_btn.addEventListener("click", () => {
	Modal.className = "none"
	is_modal_open = false
})

// Get data from #contact_form on submit event

// data = {
// 	assign_to: "name",
// 	desc: "desc",
// 	due_date: "2022-11-19",
// 	task: "title",
// }
Contact_form.addEventListener("submit", (data) => {
	// Prevent reload
	data.preventDefault()

	// Hide modal
	if (data.submitter.className === "btn_add") {
		Modal.className += " none"
		is_modal_open = false

		// Get data in FormData and return a object
		const myFormData = new FormData(data.target)
		let data_form = Object.fromEntries(myFormData.entries())
		createTodo(data_form)
	} else if (data.submitter.className === "btn_update") {
		const myFormData = new FormData(data.target)
		let data_form = Object.fromEntries(myFormData.entries())
		updateTodo(data_form)
		clearModal()
	} else if (data.submitter.className === "btn_cancel") {
		clearModal()
	}
})
