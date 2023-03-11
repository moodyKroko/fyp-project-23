import { Box, Container } from '@chakra-ui/react'
import Footer from '../Footer'
import Navbar from '../Navbar'

const bgObject = [
  { src: 'hero/bg_objects/top-bg-obj.svg' },
  { src: 'hero/bg_objects/right-bg-obj.svg' },
  { src: 'hero/bg_objects/left-bg-obj.svg' },
  { src: 'hero/bg_objects/bot-bg-obj.svg' }
]

function Layout({ router, children }) {
  const heroPage = router.pathname === '/'

  /** render background with svb obj if its landing page*/
  return heroPage ? (
    <Box>
      {/* <Box
        as={'main'}
        bgImage={`url(${bgObject[0].src})`}
        bgPos="top"
        bgRepeat="no-repeat"
      > */}
      {/* <Box
          as="div"
          bgImage={`url(${bgObject[1].src})`}
          bgPos="right"
          bgRepeat="no-repeat"
        > */}
      {/* <Box
            as="div"
            bgImage={`url(${bgObject[2].src})`}
            bgPos="left"
            bgRepeat="no-repeat"
          > */}
      {/* <Box
              as="div"
              bgImage={`url(${bgObject[3].src})`}
              bgPos="right 0% bottom 0%"
              bgRepeat="no-repeat"
              mb={10}
            > */}
      <Navbar />
      {/* <Box /> */}
      <Container maxW={'container.xl'}>{children}</Container>
      {/* </Box> */}
      <Footer />
      {/* </Box> */}
      {/* </Box> */}
      {/* </Box> */}
    </Box>
  ) : (
    /** render bg without any svb obj  */
    <Box as="main">
      <Navbar />
      <Box />
      <Container maxW={'container.xl'}>{children}</Container>
      <Footer />
    </Box>
  )
}

export default Layout
