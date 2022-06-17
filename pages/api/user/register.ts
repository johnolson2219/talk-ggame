import type { NextApiResponse, NextApiRequest } from 'next'
import bcrypt from 'bcrypt'
import { createUser, getUser } from '../../../services/database'
import { manageMethod } from '../../../utils/manageMethod'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, rol } = req.body

  const { badRequest, sendInternalError, sendResponse } = manageMethod({
    method: 'POST',
    res,
    req,
    isBodyOk: Boolean(username && password && rol),
  })

  if (badRequest || !sendResponse || !sendInternalError) return

  try {
    const isAllowedRole = !['admin', 'user'].includes(rol)
    if (isAllowedRole)
      return sendResponse({
        status: 400,
        error: true,
        message: 'Wrong rol. Allowed are admin or user.',
      })

    const isRepeatedUser = Boolean(await getUser({ username }))
    if (isRepeatedUser)
      return sendResponse({
        status: 400,
        error: true,
        message: 'User already exist.',
      })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({
      username,
      password: hashedPassword,
      rol,
    })
    sendResponse({
      status: 201,
      error: false,
      message: 'Success.',
      data: {
        id: user.id,
        username: user.username,
        rol: user.rol,
      },
    })
  } catch (error) {
    sendInternalError()
    throw error
  }
}

export default handler
