interface Language {
  settings: {
    readonly themeAuto: string
    readonly theme: string
    readonly themeDark: string
    readonly themeLight: string
    readonly language: string
    readonly languageEnglish: string
    readonly languageSpanish: string
  }
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
