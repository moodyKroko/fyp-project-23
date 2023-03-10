import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import Navbar from '../Navbar'

function Layout({ children }) {
  return (
    <Box
      as={'main'}
      bgImage="url('hero/bg_objects/top-bg-obj.svg')"
      bgPos="top"
      bgRepeat="no-repeat"
    >
      <Box
        as="div"
        bgImage="url('hero/bg_objects/right-bg-obj.svg')"
        bgPos="right"
        bgRepeat="no-repeat"
      >
        <Box
          as="div"
          bgImage="url('hero/bg_objects/left-bg-obj.svg')"
          bgPos="left"
          bgRepeat="no-repeat"
        >
          <Box
            as="div"
            bgImage="url('hero/bg_objects/bot-bg-obj.svg')"
            bgPos="right 0% bottom 0%"
            bgRepeat="no-repeat"
            mb={10}
          >
            <Navbar />
            <Box />
            <Container maxW={'container.xl'}>{children}</Container>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

const bgObject = [
  { src: 'hero/bg_objects/top-bg-obj.svg' },
  { src: 'hero/bg_objects/right-bg-obj.svg' },
  { src: 'hero/bg_objects/left-bg-obj.svg' },
  { src: 'hero/bg_objects/left-bg-obj2.svg' },
  { src: 'hero/bg_objects/bot-bg-obj.svg' }
]

export default Layout
