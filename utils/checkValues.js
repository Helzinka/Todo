export const submit = (data, key) => {
	let has_key = !key ? new Date().valueOf() : +key
	console.log(has_key)
	const key_submit = ["assign_to", "desc", "due_date", "task"]
	if (data) {
		const today = new Date().valueOf()
		const date = new Date(data.due_date)
		if (!Object.keys(data).some((e) => !key_submit.includes(e) && e != "")) {
			return { result: false, error: "empty value or missing input" }
		} else if (today >= date.valueOf()) {
			return { result: false, error: "date cannot be earlier" }
		} else {
			let d = date.getDate()
			let m = date.getMonth()
			let y = date.getFullYear().toString().slice(2)
			data.due_date_format = `${d}/${m}/${y}`
			data.key = has_key
			return { result: true, data: data }
		}
	} else {
		return { result: false, error: "missing values" }
	}
}
