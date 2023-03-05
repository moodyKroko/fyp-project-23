import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Footer from '../footer'
import Navbar from '../navbar'

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Container maxW={'container.xl'}>{children}</Container>
      <Footer />
    </Box>
  )
}

export default Layout
