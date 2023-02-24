import Head from 'next/head'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Pokemon API</title>
        <meta name='description' content='Pokemon API application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <nav className={styles.nav}>
        <a href='/'>Home</a>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default Layout
