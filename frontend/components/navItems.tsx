import { Box, Flex, Link } from '@chakra-ui/react'

import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { ColorModeSwitcher } from './ColorModeSwitcherProps'
import ProjIcon from './ProjIcon'

function NavItems() {
  const router = useRouter()
  return (
    <Box>
      <Flex align="center" style={{ gap: 48 }}>
        <ProjIcon />
        <Link as={NextLink} href="/projects/index">
          Projects
        </Link>
      </Flex>
      <Box alignItems="right">
        {router.pathname == '/' ? 'Home' : 'Not home'}
        <ColorModeSwitcher />
      </Box>
    </Box>
  )
}

export default NavItems
