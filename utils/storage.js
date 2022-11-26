export const setLocalStorage = (key, data, update = false) => {
	// if key is not already use and if data exist
	if (!update && key) {
		let { result } = getLocalStorage()
		if (!result) {
			localStorage.setItem(key, JSON.stringify(data))
			return { result: true, data: `add ${key}` }
		}
	} else if (update) {
		localStorage.setItem(key, JSON.stringify(data))
		return { result: true, data: `update ${key}` }
	} else {
		return { result: false, error: "missing date" }
	}
}
// remove data from key value
export const removeLocalStorage = (key) => {
	return localStorage.removeItem(key)
}
// get data from key value
export const getLocalStorage = (key) => {
	return localStorage.getItem(key) != undefined
		? { result: true, data: JSON.parse(localStorage.getItem(key)) }
		: { result: false, error: "no data from key" }
}
// clear all the storage
export const clearLocalStorage = () => {
	return localStorage.clear()
}
// get the length of the storage
export const getLengthLocalStorage = () => {
	return localStorage.length > 0
		? { result: true, data: localStorage.length }
		: { result: false, error: "no data" }
}

export const getAllLocalStorage = () => {
	let { result } = getLengthLocalStorage()
	if (result) {
		let data = Object.keys(localStorage).map((e) => getLocalStorage(e).data)
		return { result: true, data: data }
	} else {
		return { result: false, error: "no keys" }
	}
}
