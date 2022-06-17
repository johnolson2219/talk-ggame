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

function getAllUsers() {
  return User.findAll({
    attributes: ['username'],
  })
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

User.sync()

export { getAllUsers, getUser, createUser, updateUser, deleteUser }
