import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Footer from '../footer'
import Navbar from '../navbar'

const Layout = ({ children }) => {
  return (
    <Box as={'main'}>
      <Navbar />
      <Container maxW={'container.xl'}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Layout
