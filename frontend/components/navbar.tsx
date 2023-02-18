import { Box, Container, Flex, Link } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcherProps'
import ProjIcon from './ProjIcon'

import NextLink from 'next/link'

const Navbar = () => {
  return (
    <>
      <Box
        style={{ backdropFilter: 'blur(10px)' }}
        position="fixed"
        width="100%"
        as="nav"
        zIndex={2}
      >
        <Container
          display="flex"
          p={2}
          maxW="container.lg"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Flex align="center" style={{ gap: 48 }}>
              <ProjIcon />
              <Link as={NextLink} href="/projects">
                Projects
              </Link>
            </Flex>
          </Box>

          <Box alignItems="right">
            <ColorModeSwitcher />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Navbar
