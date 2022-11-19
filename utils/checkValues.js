const key_submit = ["assign_to", "desc", "due_date", "task"]

const checkValues = {
	sumbit: (data) => {
		return !Object.keys(data).some((e) => !key_submit.includes(e) && e != "")
	},
}

export default checkValues
