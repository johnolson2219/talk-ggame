import Head from 'next/head'

interface LayoutProps {
  children: JSX.Element
  title?: string
  replaceTitle?: boolean
}

const defaultTitle = 'GGame'

function Layout({ children, title, replaceTitle = false }: LayoutProps) {
  return (
    <>
      <Head>
        <title>
          {title
            ? replaceTitle
              ? title
              : `${defaultTitle} | ${title}`
            : defaultTitle}
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='This is the GGame description' />
      </Head>
      {children}
    </>
  )
}

export default Layout
export { defaultTitle }
