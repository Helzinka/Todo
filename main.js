import db from "./utils/storage.js"
import check from "./utils/checkValues.js"

// '$' Alias for document.querySelector
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// Selectors

const Add = $(".add")
const Add_modal = $(".add_modal")
const Cancel_btn = $(".cancel_btn")
const Content = $("#content")
const Contact_form = $("#contact_form")

// Get todo from db
getAllCardsFromDB()

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
		createCardFromSubmit(data_form)
		getNbtodo()
	}
})

for (let i = 0; i < document.querySelectorAll(".delete").length; i++) {
	document.querySelectorAll(".delete")[i].addEventListener("click", function (event) {
		let key = document.querySelectorAll(".title")[i].textContent
		db.storage.removeLocalStorage(key)
	})
}

// for (const n of document.querySelectorAll(".delete")) {
// 	n.addEventListener("click", (data) => {
// 		console.log(data)
// 		// db.storage.removeLocalStorage()
// 	})
// }

// Create a row with data from form element

// data = {
// 	assign_to: "name",
// 	desc: "desc",
// 	due_date: "2022-11-19",
// 	task: "title",
// }

function getAllCardsFromDB() {
	if (db.storage.getAllLocalStorage().result) {
		db.storage.getAllLocalStorage().result.map((e) => {
			let template_card = `
				<div class="card">
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
			Content.innerHTML += template_card

			for (let i = 0; i < document.querySelectorAll(".delete").length; i++) {
				console.log("ok")
				document.querySelectorAll(".delete")[i].addEventListener("click", function (event) {
					let key = document.querySelectorAll(".title")[i].textContent
					db.storage.removeLocalStorage(key)
				})
			}
		})
	}
}

function createCardFromSubmit(data) {
	let response = check.sumbit(data)
	if (response) {
		db.storage.setLocalStorage(data.title, data)
		let template_card = `
			<div class="card">
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
		Content.innerHTML += template_card
		for (let i = 0; i < document.querySelectorAll(".delete").length; i++) {
			console.log("ok")
			document.querySelectorAll(".delete")[i].addEventListener("click", function (event) {
				let key = document.querySelectorAll(".title")[i].textContent
				db.storage.removeLocalStorage(key)
			})
		}
	} else {
		return response
	}
}

// Update count_todo counter
function getNbtodo() {
	document.querySelector("#count_todo").textContent = document.querySelectorAll(".row").length
}
