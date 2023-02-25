import { Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Footer from '../footer'
import Navbar from '../navbar'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn homepage" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Container maxW={'container.xl'}>{children}</Container>
      </main>
      <Footer />
    </>
  )
}

export default Layout
