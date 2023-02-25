import { montserrat } from '@/lib/fonts'
import { Box, Flex, Stack, Text, Link, Container } from '@chakra-ui/react'
import NextLink from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'

const Footer = () => {
  return (
    <Box
      bg={'purple.600'}
      color={'whiteAlpha.800'}
      className={montserrat.className}
      fontSize={'large'}
    //   position={'relative'}
    >
      <Container
        display="flex"
        p={2}
        h={48}
        maxW="container.lg"
        alignItems="center"
        justifyContent="center"
        style={{ gap: 154 }}
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
      </Container>
    </Box>
  )
}

export default Footer
