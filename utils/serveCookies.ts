import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

function serveCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): { [index: string]: string | null } {
  return {
      theme: req.cookies.theme || null,
      language: req.cookies.language || null,
    }
}

export { serveCookies }
