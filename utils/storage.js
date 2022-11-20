const storage = {
	setLocalStorage: function setLocalStorage(key, data) {
		// if key is not already use
		if (!storage.getLocalStorage(key)) {
			return localStorage.setItem(key, JSON.stringify(data))
		}
	},
	// remove data from key value
	removeLocalStorage: function removeLocalStorage(key) {
		return localStorage.removeItem(key)
	},
	// get data from key value
	getLocalStorage: function getLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key))
	},
	// clear all the storage
	clearLocalStorage: function clearLocalStorage() {
		return localStorage.clear()
	},
	// get the length of the storage
	getLengthLocalStorage: function getLengthLocalStorage() {
		return localStorage.length > 0 ? localStorage.length : { error: "no data" }
	},

	getAllLocalStorage: function getAllLocalStorage() {
		if (storage.getLengthLocalStorage() > 0) {
			let data = Object.keys(localStorage).map((e) => storage.getLocalStorage(e))
			return { result: data }
		} else {
			return { error: "no keys" }
		}
	},
}

export default { storage }
