import type { NextApiResponse, NextApiRequest } from 'next'
import bcrypt from 'bcrypt'
import { createUser, getUser } from '../../../services/database'
import { manageMethod } from '../../../utils/manageMethod'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, role } = req.body

  const { badRequest, sendInternalError, sendResponse } = manageMethod({
    method: 'POST',
    res,
    req,
    isBodyOk: Boolean(username && password && role),
  })

  if (badRequest || !sendResponse || !sendInternalError) return

  try {
    const isAllowedRole = !['admin', 'user'].includes(role)
    if (isAllowedRole)
      return sendResponse({
        status: 400,
        error: true,
        message: 'Wrong role. Allowed are admin or user.',
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
      role,
    })
    sendResponse({
      status: 201,
      error: false,
      message: 'Success.',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    sendInternalError()
    throw error
  }
}

export default handler
