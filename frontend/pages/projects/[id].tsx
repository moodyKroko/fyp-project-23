import {
    Box,
    Container,
    Grid,
    GridItem, Spinner, Text
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const GetSingleProject = id => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:8081/projects/${id}`,
    fetcher
  )

  return {
    project: data,
    isError: error,
    isLoading
  }
}

const Problem = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { project, isError, isLoading } = GetSingleProject(id)

  if (isError)
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <Box mt={24}>
          <Text color={'red.500'} fontSize={24}>
            Failed to load....
          </Text>
        </Box>
      </Box>
    )

  if (isLoading)
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <Container display={'flex'} mt={24} as="div" justifyContent={'center'}>
          <Spinner size={'xl'} speed="0.65s" thickness="8px" color={'purple.600'} />
        </Container>
      </Box>
    )

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <Head>
          <title>Project | {`${project.title.toUpperCase()} `}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Proj2learn problems page" />
          <meta name="author" content="Russel Rai" />
          <meta name="author" content="moodykroko" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <Container display={'flex'} mt={24} justifyContent={'center'}>
          <Text color={'red'} casing={'capitalize'}>
            Problem Title: {project.title}
          </Text>
        </Container> */}
        <Container maxW={'container.xl'} mt={24}>
          <Grid
            templateRows="repeat(8, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={1}
          >
            <GridItem w={'100%'} rowSpan={6} colSpan={1} bg={'tomato'}>
              Question Page
            </GridItem>
            <GridItem w={'100%'} rowSpan={6} colSpan={1} bg={'papayawhip'}>
              Editor Page
            </GridItem>
            <GridItem w={'100%'} rowSpan={2} colSpan={2} bg={'teal'}>
              Error Console
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Problem
