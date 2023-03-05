import { montserrat } from '@/lib/fonts'
import { Box, Flex, Stack, Text, Link, Container, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

const Footer = () => {
  return (
    <Box
      opacity={0.4}
      className={montserrat.className}
      fontSize={'md'}
      justifyContent={'center'}
      alignContent={'center'}
      display={'flex'}
      mt={10}
      mb={10}
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
