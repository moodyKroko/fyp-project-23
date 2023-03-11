import { Box, Container, Flex, Link, Text } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcherProps'
import ProjIcon from './ProjIcon'

import NextLink from 'next/link'
import { motion } from 'framer-motion'

function Navbar() {
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
            <Link as={NextLink} href="/projects" _hover={{}}>
              <Box
                as={motion.div}
                whileHover={{ scale: 1.2 }}
                p={4}
                fontWeight={'semibold'}
                fontSize={'lg'}
                letterSpacing="wide"
              >
                <Text>Projects</Text>
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
