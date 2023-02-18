import { Box, Image } from '@chakra-ui/react'
import Link from 'next/link'

const ProjIcon = () => {
  return (
    <Box>
      <Link href="/" scroll={false}>
        <Image boxSize="50px" src="/proj2learn.png" alt="website logo" />
      </Link>
    </Box>
  )
}

export default ProjIcon
