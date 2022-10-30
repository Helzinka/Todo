// '$' Alias for document.querySelector

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Selectors

let add = $(".add");
let add_modal = $(".add_modal");
let add_btn = $(".add_btn");
let cancel_btn = $(".cancel_btn");

// Display or not a task

let is_add_open = false;

add.addEventListener("click", (data) => {
	if (!is_add_open) {
		add_modal.classList.remove("none");
		is_add_open = true;
	}
});

add_btn.addEventListener("click", (data) => {
	add_modal.className += " none";
	is_add_open = false;
});

cancel_btn.addEventListener("click", (data) => {
	add_modal.className += " none";
	is_add_open = false;
});
