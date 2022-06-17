import type { NextApiRequest, NextApiResponse } from 'next'

interface ManageMethodProps {
  res: NextApiResponse
  req: NextApiRequest
  method: 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'DELETE'
  isBodyOk: boolean | (() => boolean)
}

interface ManageMethodReturnValue {
  sendResponse?: (responseToSend: Response) => void
  sendInternalError?: () => void
  badRequest?: true
}

interface Response {
  status: number
  error: boolean
  message?: string
  data?: {
    [index: string]: any
  }
}

const response: Response = {
  status: 200,
  error: false,
}

function manageMethod({
  res,
  req,
  method,
  isBodyOk,
}: ManageMethodProps): ManageMethodReturnValue {
  function sendResponse(responseToSend: Response) {
    const newResponse = { ...response, ...responseToSend }
    res.status(newResponse.status).json(newResponse)
  }

  function sendInternalError() {
    sendResponse({ status: 500, error: true, message: 'Internal error.' })
  }

  if (req.method !== method) {
    sendResponse({
      status: 405,
      error: true,
      message: `Use method ${method} instead.`,
    })
    return { badRequest: true }
  }

  if (typeof isBodyOk === 'function') isBodyOk = isBodyOk()

  if (isBodyOk) {
    return { sendResponse, sendInternalError }
  } else {
    sendResponse({
      status: 400,
      error: true,
      message: 'Body is not the expected. Try again.',
    })
    return { badRequest: true }
  }
}

export { manageMethod, type Response }
