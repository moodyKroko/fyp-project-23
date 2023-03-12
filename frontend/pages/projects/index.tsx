import {
  Box,
  Container,
  Grid,
  GridItem,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { motion } from 'framer-motion'
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
  try {
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
  } catch (error) {
    return {
      notFound: true
    }
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
      <Container maxW={'container.lg'}>
        <Stack
          width={'full'}
          // justifyContent={'center'}
          direction={'column'}
          spacing={4}
          padding={4}
          mt={0}
        >
          {/* Table header */}
          <Grid
            pl={16}
            py={4}
            pr={4}
            // justifyItems={'center'}
            alignItems={'center'}
            borderBottom={'2px solid gray'}
            templateColumns="repeat(4, 1fr)"
          >
            <GridItem colSpan={2}>
              <Text fontSize={'xl'}>Title</Text>
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
            <Text pl={16} py={4} borderBottom={'1px solid grey'}>
              Showing {projects.length} results
            </Text>
            {projects.map((project: Projects) => (
              <ProjectItems key={project.id} project={project} />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

function ProjectItems({ project }) {
  const textHighlightColor = useColorModeValue('blue.500', 'purple.500')
  const bgHighlight = useColorModeValue('#f3eaff', '#44526d')

  return (
    <Box
      pl={16}
      py={4}
      pr={4}
      as={motion.div}
      borderBottom={'1px solid slategray'}
      whileHover={{ backgroundColor: bgHighlight }}
      _last={{ borderBottom: 'none', borderBottomRadius: 'xl' }}
    >
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={2}>
          <Link
            as={NextLink}
            href={`/projects/${project.id}`}
            _hover={{ color: textHighlightColor }}
          >
            {project.title}
          </Link>
        </GridItem>

        <GridItem>{project.status}</GridItem>
        <GridItem>{project.difficulty}</GridItem>
      </Grid>
    </Box>
  )
}

export default Projects
