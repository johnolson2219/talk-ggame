import { IncomingMessage } from 'http'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

function serveCookies(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): { props: { [index: string]: string | null } } {
  return {
    props: {
      theme: req.cookies.theme || null,
      language: req.cookies.language || null,
    },
  }
}

export { serveCookies }
