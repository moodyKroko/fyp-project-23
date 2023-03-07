import { Box, Container, Flex, Link } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcherProps'
import ProjIcon from './ProjIcon'

import NextLink from 'next/link'

const Navbar = () => {
  return (
    <Box
      style={{ backdropFilter: 'blur(10px)' }}
      position="sticky"
      top={0}
      width="100%"
      as="nav"
      zIndex={100}
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
            <Link
              as={NextLink}
              href="/projects"
              _hover={{ color: 'violet', borderBottom: '1px solid violet' }}
            >
              <Box
                p={4}
                fontWeight={'semibold'}
                fontSize={'lg'}
                letterSpacing="wide"
              >
                Projects
              </Box>
            </Link>
          </Flex>
        </Box>

        <Box alignItems="right">
          <ColorModeSwitcher />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
