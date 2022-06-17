import {
  type ChangeEvent,
  useContext,
  useState,
  type FormEvent,
  useRef,
} from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import cn from 'classnames'
import Layout from '../../components/layout'
import Input from '../../components/input'
import Button from '../../components/button'
import utilStyles from '../../styles/utils.module.css'
import styles from './register.module.css'

import {
  LanguageContext,
  type LanguageContextValue,
} from '../../contexts/language'
import { serveCookies } from '../../utils/serveCookies'

interface FormState {
  form: { username: string; password: string; role: 'admin' | 'user' }
  process:
    | {
        state: 'stale' | 'pending' | 'success'
      }
    | { state: 'error'; message: string }
}

const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: { ...serveCookies(req) } }
}

const Register: NextPage = () => {
  const { lang }: LanguageContextValue = useContext(LanguageContext)

  const [form, setForm] = useState<FormState['form']>({
    username: '',
    password: '',
    role: 'user',
  })
  const [process, setProcess] = useState<FormState['process']>({
    state: 'stale',
  })
  const userQueryTimeoutId = useRef<ReturnType<typeof setTimeout>>()
  const inputValidatorRef = useRef<HTMLElement>(null)

  function changeDataOfInputValidator(value: string) {
    if (inputValidatorRef.current === null) return
    inputValidatorRef.current.dataset.inputState = value
  }

  function handleInput({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.name === 'username') {
      clearTimeout(userQueryTimeoutId.current)
      userQueryTimeoutId.current = setTimeout(() => {
        console.log('fetching input data')

        if (target.value === '') return changeDataOfInputValidator('')

        changeDataOfInputValidator('loader')

        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username: target.value }),
        })
          .then((res) => res.json())
          .then(({ data, error, message }) => {
            if (error) throw new Error(message)
            changeDataOfInputValidator(
              data.username === null ? 'available' : 'not available'
            )
          })
          .catch((error) => {
            if (error instanceof Error) {
              changeDataOfInputValidator('error')
              console.log(error.message)
              console.error(error)
            }
          })
      }, 800)
    }

    setForm({ ...form, [target.name]: target.value })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      if (inputValidatorRef.current?.dataset.inputState === 'not available')
        throw new Error('Change the username for a valid one.')

      setProcess({ state: 'pending' })
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          role: form.role,
        }),
      })
      const data = await res.json()

      if (data.error) throw new Error(data.message)

      setProcess({ state: 'success' })
    } catch (error) {
      if (error instanceof Error) {
        setProcess({ state: 'error', message: error.message })
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
        <h2 className={utilStyles.h2}>{lang.registerPage.singup}</h2>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <Input
            id='username'
            name='username'
            value={form.username}
            label={lang.registerPage.usernameLabel}
            required
            onChange={handleInput}
          >
            <span className={styles.inputValidator} ref={inputValidatorRef} />
          </Input>
          <Input
            id='password'
            name='password'
            value={form.password}
            label={lang.registerPage.passwordLabel}
            type='password'
            required
            onChange={handleInput}
          />
          <Button
            newClass={utilStyles.h6}
            disabled={process.state === 'pending'}
            type='submit'
          >
            {lang.registerPage.submit}
          </Button>
          {process.state === 'error' && (
            <p className={utilStyles.textError}>{process.message}</p>
          )}
          {process.state === 'pending' && (
            <p>{lang.registerPage.loadingText}</p>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default Register
export { getServerSideProps }
