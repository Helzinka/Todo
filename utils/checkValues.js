const key_submit = ["assign_to", "desc", "due_date", "task"]

const checkValues = {
	sumbit: (data) => {
		if (data) {
			const today = new Date().valueOf()
			const date = new Date(data.due_date)
			if (!Object.keys(data).some((e) => !key_submit.includes(e) && e != "")) {
				return { error: "empty value or missing input" }
			} else if (today >= date.valueOf()) {
				return { error: "date cannot be earlier" }
			} else {
				let d = date.getDate()
				let m = date.getMonth()
				let y = date.getFullYear().toString().slice(2)
				data.due_date = `${d}/${m}/${y}`
				return { result: "true", data: data }
			}
		} else {
			return { error: "empty form" }
		}
	},
}

export default checkValues
