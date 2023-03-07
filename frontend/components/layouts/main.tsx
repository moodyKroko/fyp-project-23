import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import Navbar from '../navbar'

function Layout({ children }) {
  return (
    <Box as={'main'}>
      <Navbar />
      <Box />
      <Container maxW={'container.xl'}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Layout
