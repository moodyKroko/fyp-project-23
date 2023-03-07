import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import Navbar from '../Navbar'

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
