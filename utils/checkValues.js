export const submit = (data, key) => {
	let has_key = !key ? new Date().valueOf() : +key
	const key_submit = ["assign_to", "desc", "due_date", "task"]
	if (data) {
		const today = new Date().setHours(0)
		let date = new Date(data.due_date)
		if (Object.values(data).some((e) => e === "")) {
			return { result: false, error: "empty value or missing input" }
		} else if (date.valueOf() <= today.valueOf()) {
			return { result: false, error: "date cannot be earlier" }
		} else {
			data.due_date_format = `${date.getDate()}/${date.getMonth()}/${date
				.getFullYear()
				.toString()
				.slice(2)}`
			data.key = has_key
			data.completed = false
			data.assign_to =
				data.assign_to.charAt(0).toUpperCase() + data.assign_to.slice(1)
			return { result: true, data: data }
		}
	} else {
		return { result: false, error: "missing values" }
	}
}
