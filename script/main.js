// '$' Alias for document.querySelector
import db from "./storage.js"
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Selectors

const Add = $(".add")
const Add_modal = $(".add_modal")
const Add_btn = $(".add_btn")
const Cancel_btn = $(".cancel_btn")
const Content = $("#content")
const Contents = $$("#content")
const Rows = $$(".row")
const Contact_form = $("#contact_form")
const Count_todo = $("#count_todo")

// Get nb todo from count_todo
getNbtodo()

// Display a task modal from add button
let is_add_open = false

Add.addEventListener("click", (data) => {
	if (!is_add_open) {
		Add_modal.classList.remove("none")
		is_add_open = true
	}
})

// Hide task modal if #candel is performed
Cancel_btn.addEventListener("click", (data) => {
	Add_modal.className += " none"
	is_add_open = false
})

// Get data from #contact_form on submit event
Contact_form.addEventListener("submit", (data) => {
	// Prevent reload
	data.preventDefault()

	// Hide modal
	if (data.submitter.className === "add_btn") {
		Add_modal.className += " none"
		is_add_open = false

		// Get data in FormData and return a object
		const myFormData = new FormData(data.target)
		let data_form = Object.fromEntries(myFormData.entries())

		createRow(data_form)
		getNbtodo()
	}
})

// Create a row with data from form element
function createRow(data) {
	// check if title task > 3 characters
	if (data.task.length > 2) {
		let startClassName = document.querySelectorAll(".row").length < 1 ? "start" : ""
		let template_todo = `
			<div class="row ${startClassName}">
				<div class="completed_container">
					<input type="checkbox" class="completed" />
					<label for="checkbox"></label>
				</div>
				<div id="card">
					<div class="title">
						${data.task}
					</div>
					<div class="description">
						${data.desc}
					</div>
					<div class="meta">
						<div class="date">
							<i class="fa-regular fa-calendar"></i>
							<span>6 avril</span>
						</div>
						<div class="autor">
							<i class="fa-regular fa-user"></i>
							<span>Autor name</span>
						</div>
					</div>
				</div>
			</div>`

		Content.innerHTML += template_todo
	}
}

// Update count_todo counter
function getNbtodo() {
	document.querySelector("#count_todo").textContent = document.querySelectorAll(".row").length
}
