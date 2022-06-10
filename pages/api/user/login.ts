import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { getUser } from '../../../services/database'
import { manageMethod } from '../../../utils/manageMethod'
import { withSessionRoute } from '../../../utils/withSession'

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { username, password } = req.body

  const { sendResponse, sendInternalError, badRequest } = manageMethod({
    req,
    res,
    method: 'POST',
    isBodyOk: Boolean(username && password),
  })

  if (badRequest || !sendResponse || !sendInternalError) return

  try {
    const user = await getUser({ username })

    if (!user)
      return sendResponse({
        status: 400,
        error: true,
        message: 'User not found in the database.',
      })

    const validatePassword = await bcrypt.compare(password, user.password)

    if (validatePassword) {
      const userData = { id: user.id, username: user.username, rol: user.rol }

      req.session.user = userData
      await req.session.save()
      sendResponse({
        status: 200,
        error: false,
        message: 'Success.',
        data: userData,
      })
    } else {
      sendResponse({ status: 400, error: true, message: 'Not allowed.' })
    }
  } catch (error) {
    sendInternalError()
    throw error
  }
}

export default withSessionRoute(handler)
