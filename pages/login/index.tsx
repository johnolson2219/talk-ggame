import { useContext } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import cn from 'classnames'
import Layout from '../../components/layout'
import Form, { type HandleSubmitProps } from '../../components/form'
import styles from './login.module.css'
import utilStyles from '../../styles/utils.module.css'

import {
  LanguageContext,
  type LanguageContextValue,
} from '../../contexts/language'
import { serveCookies } from '../../utils/serveCookies'

const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: { ...serveCookies(req) } }
}

const Login: NextPage = () => {
  const { lang }: LanguageContextValue = useContext(LanguageContext)

  async function handleSubmit({ event, form, setProcess }: HandleSubmitProps) {
    event.preventDefault()

    const { origin } = window.location

    try {
      setProcess({ state: 'pending' })
      const res = await fetch(origin + '/api/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.error) throw new Error(data.message)

      setProcess({ state: 'success' })
    } catch (error) {
      if (error instanceof Error) {
        const message =
          error.message === 'Not allowed.'
            ? lang.loginPage.messagePasswordError
            : error.message === 'User not found in the database.'
            ? lang.loginPage.messageUserError
            : 'Error'
        setProcess({ state: 'error', message })
      } else {
        console.warn(error)
      }
    }
  }

  return (
    <Layout>
      <div
        className={cn(
          styles.container,
          utilStyles.textCenter,
          utilStyles.flexColumnCenter
        )}
      >
        <h2 className={utilStyles.h3}>{lang.loginPage.login}</h2>
        <Form
          usernameLabel={lang.loginPage.usernameLabel}
          passwordLabel={lang.loginPage.passwordLabel}
          submitText={lang.loginPage.submit}
          pendingText={lang.loginPage.loadingText}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  )
}

export default Login
export { getServerSideProps }
