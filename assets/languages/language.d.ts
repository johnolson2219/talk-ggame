interface Language {
  loginPage: {
    readonly login: string
    readonly usernameLabel: string
    readonly passwordLabel: string
    readonly submit: string
    readonly loadingText: string
    readonly messageUserError: string
    readonly messagePasswordError: string
  }
  registerPage: {
    readonly singup: string
    readonly usernameLabel: string
    readonly passwordLabel: string
    readonly submit: string
    readonly loadingText: string
  }
}

export { Language }
