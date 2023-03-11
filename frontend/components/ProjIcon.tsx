import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'
import Link from 'next/link'

import Logo from '../public/proj2learn.png'

const ProjIcon = () => {
  return (
    <Box>
      <Link href="/" scroll={false}>
        <NextImage alt="site logo" src={Logo} width={50} height={50} />
      </Link>
    </Box>
  )
}

export default ProjIcon
