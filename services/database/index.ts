import { User } from './models/user'

interface GetUserProps {
  username: string
}

interface CreateUserProps {
  username: string
  password: string
  role?: 'admin' | 'user'
}

interface UpdateUserProps {
  key: string
  username?: string
  password?: string
  role?: 'admin' | 'user'
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
  role = 'user',
}: CreateUserProps) {
  return User.create({ username, password, role })
}

async function updateUser({ key, username, password, role }: UpdateUserProps) {
  const user = await getUser({ username: key })
  if (!user) return null

  username && user.username
  password && user.password
  role && user.role

  user.save()
}

async function deleteUser({ username }: DeleteUserProps) {
  const user = await getUser({ username })
  if (!user) return null

  user.destroy()
}

User.sync()

export { getAllUsers, getUser, createUser, updateUser, deleteUser }
