import { Box, Link, Stack, Text } from '@chakra-ui/react'

import Head from 'next/head'
import NextLink from 'next/link'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:8081/projects')
  const data = await res.json()

  return {
    props: { projects: data }
  }
}

const Projects = ({ projects }) => {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Head>
        <title>Project | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn problems page" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        width={'full'}
        // justifyContent={'center'}
        direction={'column'}
        spacing={4}
        padding={4}
        mt={24}
      >
        <Stack direction={'row'} p={4} justifyContent={'space-between'}>
          <Text as={'h2'}>Title</Text>
          <Text as={'h2'}>Status</Text>
          <Text as={'h2'}>Difficulty</Text>
        </Stack>
        {projects.map(project => (
          <Stack
            direction={'row'}
            key={project.id}
            p={4}
            justifyContent={'space-between'}
            style={{ border: '1px white' }}
          >
            <Box p={4} w={250} textAlign={'left'}>
              <Link
                as={NextLink}
                href={`/projects/${project.id}`}
                _hover={{ color: 'purple.600' }}
              >
                <Text as={'h3'}>{project.title}</Text>
              </Link>
            </Box>

            <Box p={4} w={180}>
              {project.status}
            </Box>
            <Box p={4} w={180} textAlign={'right'}>
              {project.difficulty}
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default Projects
