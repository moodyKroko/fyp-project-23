import {
  Box,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import Head from 'next/head'
import NextLink from 'next/link'
import { motion } from 'framer-motion'

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

function Projects({ projects }) {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Head>
        <title>All Projects</title>
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
        <Grid
          //   p={4}
          justifyItems={'center'}
          alignItems={'center'}
          borderBottom={'2px solid gray'}
          templateColumns="repeat(3, 1fr)"
        >
          <GridItem>
            <Text fontSize={'xl'} p={4}>
              Title
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize={'xl'}>Status</Text>
          </GridItem>
          <GridItem>
            <Text fontSize={'xl'}>Difficulty</Text>
          </GridItem>
        </Grid>
        {/* Table content */}
        <Box border="1px solid gray" borderRadius={'xl'}>
          {/* <Text>Showing {projects.length} results</Text> */}
          {projects.map((project: Projects) => (
            <ProjectItems key={project.id} project={project} />
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

function ProjectItems({ project }) {
  const textHighlightColor = useColorModeValue('purple.600', 'purple.500')
  const bgHighlight = useColorModeValue('#d9d9d9', '#313a4e')

  return (
    <Box
      borderBottom={'1px solid slategray'}
      _hover={{ backgroundColor: bgHighlight }}
      _last={{ borderBottom: 'none', borderBottomRadius: 'xl' }}
      _first={{ borderTopRadius: 'xl' }}
    >
      <Box as={motion.div} whileHover={{ scale: 1.1 }} transition="linear 0.1s">
        <Grid
          //   justifyItems={'left'}
          p={8}
          alignItems={'center'}
          templateColumns="repeat(3, 1fr)"
          _hover={{ color: textHighlightColor }}
        >
          <GridItem colSpan={1}>
            <Link as={NextLink} href={`/projects/${project.id}`}>
              <Box textAlign={'center'}>{project.title}</Box>
            </Link>
          </GridItem>

          <GridItem colSpan={1}>
            <Box textAlign={'center'}>{project.status}</Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box textAlign={'center'}>{project.difficulty}</Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

export default Projects
