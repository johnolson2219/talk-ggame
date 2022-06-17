import type { NextApiRequest, NextApiResponse } from 'next'

import { getAllUsers, getUser } from '@/services/database'
import { manageMethod } from '@/utils/manageMethod'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userList = await getAllUsers()
    res.status(200).json(userList)
    return
  }

  const { username } = req.body

  const { badRequest, sendResponse, sendInternalError } = manageMethod({
    method: 'POST',
    req,
    res,
    isBodyOk: Boolean(username),
  })

  if (badRequest || !sendResponse || !sendInternalError) return

  try {
    const user = await getUser({ username })

    if (user === null)
      return sendResponse({
        status: 200,
        error: false,
        message: "That user doesn't exist.",
        data: { username: user },
      })

    sendResponse({
      status: 200,
      error: false,
      data: { username: user.username },
    })
  } catch (error) {
    sendInternalError()
  }
}

export default handler
