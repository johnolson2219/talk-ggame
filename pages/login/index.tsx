import { type ChangeEvent, useContext, useState, type FormEvent } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import cn from 'classnames'
import Layout from '../../components/layout'
import Input from '../../components/input'
import Button from '../../components/button'
import utilStyles from '../../styles/utils.module.css'
import styles from './login.module.css'

import {
  LanguageContext,
  type LanguageContextValue,
} from '../../contexts/language'
import { serveCookies } from '../../utils/serveCookies'

interface FormState {
  form: { username: string; password: string }
  process:
    | {
        state: 'stale' | 'pending' | 'success'
      }
    | {
        state: 'error'
        message: string
      }
}

const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: { ...serveCookies(req) } }
}

const Login: NextPage = () => {
  const { lang }: LanguageContextValue = useContext(LanguageContext)

  const [form, setForm] = useState<FormState['form']>({
    username: '',
    password: '',
  })
  const [process, setProcess] = useState<FormState['process']>({
    state: 'stale',
  })

  function handleInput({ target }: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [target.name]: target.value })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      setProcess({ state: 'pending' })
      const res = await fetch('/api/user/login', {
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
            : 'Internal Error'
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
        <h2 className={utilStyles.h2}>{lang.loginPage.login}</h2>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <Input
            id='username'
            name='username'
            value={form.username}
            label={lang.loginPage.usernameLabel}
            required
            onChange={handleInput}
          />
          <Input
            id='password'
            name='password'
            value={form.password}
            label={lang.loginPage.passwordLabel}
            type='password'
            required
            onChange={handleInput}
          />
          <Button
            newClass={utilStyles.h6}
            disabled={process.state === 'pending'}
            type='submit'
          >
            {lang.loginPage.submit}
          </Button>
          {process.state === 'error' && (
            <p className={utilStyles.textError}>{process.message}</p>
          )}
          {process.state === 'pending' && <p>{lang.loginPage.loadingText}</p>}
        </form>
      </div>
    </Layout>
  )
}

export default Login
export { getServerSideProps }
