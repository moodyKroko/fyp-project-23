import { Box, Container, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Problem = () => {
  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <Head>
          <title>Project | Home</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Proj2learn problems page" />
          <meta name="author" content="Russel Rai" />
          <meta name="author" content="moodykroko" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container mt={24}>
          <Text casing={'capitalize'}>Problem Title: {}</Text>
        </Container>
      </Box>
    </>
  )
}

export default Problem
