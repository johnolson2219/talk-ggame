import type { GetServerSideProps, NextPage } from 'next'
import Layout from '../components/layout'

import { serveCookies } from '../utils/serveCookies'

const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return { props: { ...serveCookies(req) } }
}

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home
export { getServerSideProps }
