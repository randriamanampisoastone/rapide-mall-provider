export const setItem = async (key: string, value: string) => {
   localStorage.setItem(key, value)
}

export const getItem = async (key: string) => {
   return localStorage.getItem(key)
}

export const removeItem = async (key: string) => {
   localStorage.removeItem(key)
}
