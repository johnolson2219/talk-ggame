import { User } from './models/user'

interface GetUserProps {
  username: string
}

interface CreateUserProps {
  username: string
  password: string
  rol?: 'admin' | 'user'
}

interface UpdateUserProps {
  key: string
  username?: string
  password?: string
  rol?: 'admin' | 'user'
}

interface DeleteUserProps {
  username: string
}

function getUser({ username }: GetUserProps) {
  return User.findOne({
    where: {
      username,
    },
  })
}

async function createUser({
  username,
  password,
  rol = 'user',
}: CreateUserProps) {
  // * This line below drop the existed table and create his own. Useness for reset the id autoincrement.
  // await User.sync({ force: true })
  return User.create({ username, password, rol })
}

async function updateUser({ key, username, password, rol }: UpdateUserProps) {
  const user = await getUser({ username: key })
  if (!user) return null

  username && user.username
  password && user.password
  rol && user.rol

  user.save()
}

async function deleteUser({ username }: DeleteUserProps) {
  const user = await getUser({ username })
  if (!user) return null

  user.destroy()
}

export { getUser, createUser, updateUser, deleteUser }
