export const TOKEN_KEY = "__USER_LOGIN_TOKEN__"

export const saveLogin = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const getLogin = () => sessionStorage.getItem(TOKEN_KEY)

export const clearLogin = () => sessionStorage.removeItem(TOKEN_KEY)
