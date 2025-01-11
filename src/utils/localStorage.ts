const INFO = "info"

export const storeLocal = (info: string) => {
  localStorage.setItem(INFO, info)
}

export const getInfo = () => localStorage.getItem(INFO)
