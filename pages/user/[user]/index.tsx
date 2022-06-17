import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'

import { serveCookies } from '../../../utils/serveCookies'

// TODO: Connect user session with iron-session and pass the props
const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  return { props: { ...serveCookies(req) } }
}

// TODO: Create a interface for own profile and view profile
const UserProfile: NextPage = ({}) => {
  return <div>UserProfile</div>
}

export default UserProfile
export { getServerSideProps }
