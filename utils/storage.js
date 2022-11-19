const storage = {
	setLocalStorage: function setLocalStorage(key, data) {
		// if key is not already use
		if (!storage.getLocalStorage(key)) {
			return localStorage.setItem(key, data)
		}
	},
	// remove data from key value
	removeLocalStorage: function removeLocalStorage(key) {
		return localStorage.removeItem(key)
	},
	// get data from key value
	getLocalStorage: function getLocalStorage(key) {
		return localStorage.getItem(key)
	},
	// clear all the storage
	clearLocalStorage: function clearLocalStorage() {
		return localStorage.clear()
	},
	// get the length of the storage
	getLengthLocalStorage: function getLengthLocalStorage() {
		return localStorage.length
	},
}

export default { storage }
