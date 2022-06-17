import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next'

const IRON_SESSION_PASSWORD = process.env.IRON_SESSION_PASSWORD as string

const sessionOptions = {
  password: IRON_SESSION_PASSWORD,
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
      username: string
      role?: 'admin' | 'user'
    }
  }
}
