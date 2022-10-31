// '$' Alias for document.querySelector

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Selectors

let Add = $(".add");
let Add_modal = $(".add_modal");
let Add_btn = $(".add_btn");
let Cancel_btn = $(".cancel_btn");
let Content = $("#content");
let Contact_form = $("#contact_form");

// Display a task modal from add button

let is_add_open = false;

Add.addEventListener("click", (data) => {
	if (!is_add_open) {
		Add_modal.classList.remove("none");
		is_add_open = true;
	}
});

// Hide task modal if candel is performed
Cancel_btn.addEventListener("click", (data) => {
	Add_modal.className += " none";
	is_add_open = false;
});

// Get data from formdata on submit event
Contact_form.addEventListener("submit", (data) => {
	// Prevent reload
	data.preventDefault();

	// Hide modal
	Add_modal.className += " none";
	is_add_open = false;

	// Get data in FormData and return a object
	const myFormData = new FormData(data.target);
	let data_form = Object.fromEntries(myFormData.entries());

	return createRow(data_form);
});

function createRow(data) {
	console.log(data.task.length);
	if (data.task.length > 2) {
		let template_todo = `
			<div class="row">
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
							<span>Franz lvq</span>
						</div>
					</div>
				</div>
			</div>`;

		Content.innerHTML += template_todo;
	} else {
		Content.innerHTML = Content.innerHTML;
	}
	// else {
	// 	infos("Title is empty", "red");
	// }
}
