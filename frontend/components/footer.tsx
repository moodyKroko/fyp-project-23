import { montserrat } from '@/lib/fonts'
import { Box, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

function Footer() {
  return (
    <Box
      opacity={0.4}
      style={montserrat.style}
      fontSize={'md'}
      justifyContent={'center'}
      alignContent={'center'}
      display={'flex'}
      bottom={0}
      mt={12}
      mb={12}
      gap={150}
    >
      <Link
        as={NextLink}
        href="https://github.com/moodyKroko/fyp-project-23"
        target={'_blank'}
        display={'inline-flex'}
        alignItems={'center'}
        style={{ gap: 4 }}
      >
        <IoLogoGithub />
        Source
      </Link>
      &copy; Russel Rai, Brunel University Final Year Project 2022-2023
    </Box>
  )
}

export default Footer
