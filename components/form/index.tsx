import {
  type ChangeEvent,
  type FormEvent,
  type SetStateAction,
  type Dispatch,
  useState,
} from 'react'
import Input from '../../components/input'
import Button from '../../components/button'
import utilStyles from '../../styles/utils.module.css'

interface HandleSubmitProps {
  event: FormEvent
  setProcess: Dispatch<SetStateAction<FormState['process']>>
  form: FormState['form']
}

interface FormProps {
  handleSubmit: (arg0: HandleSubmitProps) => void
  usernameLabel: string
  passwordLabel: string
  submitText: string
  pendingText: string
}

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

function Form({
  handleSubmit,
  usernameLabel,
  passwordLabel,
  submitText,
  pendingText,
}: FormProps) {
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

  return (
    <form
      autoComplete='off'
      onSubmit={(event) => handleSubmit({ event, setProcess, form })}
    >
      <Input
        id='username'
        name='username'
        label={usernameLabel}
        required
        onChange={handleInput}
        value={form.username}
      />
      <Input
        id='password'
        name='password'
        type='password'
        label={passwordLabel}
        required
        onChange={handleInput}
        value={form.password}
      />
      <Button
        newClass={utilStyles.h6}
        disabled={process.state === 'pending'}
        type='submit'
      >
        {submitText}
      </Button>
      {process.state === 'error' && (
        <p className={utilStyles.textError}>{process.message}</p>
      )}
      {process.state === 'pending' && <p>{pendingText}</p>}
    </form>
  )
}

export default Form
export { type HandleSubmitProps }
