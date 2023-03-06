import {
  border,
  Box,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'

type Projects = {
  id: number
  title: string
  description: string
  difficulty: string
  status: string
}

export const getStaticProps: GetStaticProps<{
  projects: Projects[]
}> = async context => {
  const res = await fetch('http://localhost:8081/projects')
  const projects: Projects[] = await res.json()

  if (!projects) {
    return {
      notFound: true
    }
  }

  return {
    props: { projects }
  }
}

const ProjectItems = ({ project }) => {
  return (
    <Stack
      direction={'row'}
      key={project.id}
      p={4}
      justifyContent={'space-between'}
      _hover={{ borderLeft: '8px solid purple' }}
      style={{
        borderBottom: '1px solid gray',
        marginTop: '0px'
      }}
      _even={{ background: 'purple.500', textColor: 'white' }}
    >
      <Link as={NextLink} href={`/projects/${project.id}`} _hover={{}}>
        <Box p={4} w={250} textAlign={'left'}>
          {project.title}
        </Box>
      </Link>

      <Box p={4} w={180}>
        {project.status}
      </Box>
      <Box p={4} w={180} textAlign={'right'}>
        {project.difficulty}
      </Box>
    </Stack>
  )
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
      {/* Table */}
      <Stack
        width={'full'}
        // justifyContent={'center'}
        direction={'column'}
        spacing={4}
        padding={4}
        mt={24}
      >
        {/* Table header */}
        <Stack
          direction={'row'}
          p={4}
          justifyContent={'space-between'}
          borderBottom={'2px solid gray'}
        >
          <Text fontSize={'xl'} p={4}>
            Title
          </Text>
          <Text fontSize={'xl'}>Status</Text>
          <Text fontSize={'xl'}>Difficulty</Text>
        </Stack>
        {/* Table content */}
        {projects.map((project: Projects) => (
          <ProjectItems key={project.id} project={project} />
        ))}
      </Stack>
    </Box>
  )
}

export default Projects
