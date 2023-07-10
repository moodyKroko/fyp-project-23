import {
  Box,
  chakra,
  Container,
  Grid,
  GridItem,
  Link,
  shouldForwardProp,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { easeIn, isValidMotionProp, motion } from 'framer-motion'
import Head from 'next/head'
import NextLink from 'next/link'
import { IoCheckmarkDone, IoCloseSharp, IoHourglassSharp } from 'react-icons/io5'

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

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const tableAnimation = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.2,
      ease: 'easeInOut'
    }
  }
}

function Projects({ projects }) {
  const bgTableColor = useColorModeValue('#e8f1f2', '#1E2533')
  const textHighlightColor = useColorModeValue('blue.500', 'purple.500')
  const bgHighlight = useColorModeValue('#ABB2B3', '#171C29')
  const borderColor = useColorModeValue('#d5e0e1', '#303a4e')

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
      <ChakraBox variants={tableAnimation} initial="hidden" animate="visible">
        <Container maxW={'container.lg'}>
          <Stack width={'full'} direction={'column'} spacing={4} padding={4} mt={0}>
            {/* Table header */}
            <Grid
              pl={16}
              py={4}
              pr={4}
              alignItems={'center'}
              templateColumns="repeat(4, 1fr)"
            >
              <GridItem colSpan={2}>
                <Text fontSize={'xl'} textShadow={'1px 1px 1px #d5e0e1'}>
                  Title
                </Text>
              </GridItem>
              <GridItem justifySelf={'center'}>
                <Text fontSize={'xl'} textShadow={'1px 1px 1px #d5e0e1'}>
                  Status
                </Text>
              </GridItem>
              <GridItem justifySelf={'center'}>
                <Text fontSize={'xl'} textShadow={'1px 1px 1px #d5e0e1'}>
                  Difficulty
                </Text>
              </GridItem>
            </Grid>

            {/* Table content */}
            <Box
              border={`1px solid ${borderColor}`}
              borderRadius={'lg'}
              shadow={'2xl'}
              bgColor={bgTableColor}
            >
              <Text pl={16} py={4} borderBottom={`1px solid ${borderColor}`}>
                Showing {projects.length} results
              </Text>
              {projects.map((project: Projects) => (
                <ProjectItems
                  key={project.id}
                  project={project}
                  textHighlightColor={textHighlightColor}
                  bgHighlight={bgHighlight}
                  bgTableColor={bgTableColor}
                  borderColor={borderColor}
                />
              ))}
            </Box>
          </Stack>
        </Container>
      </ChakraBox>
    </Box>
  )
}

function ProjectItems({
  project,
  textHighlightColor,
  bgHighlight,
  bgTableColor,
  borderColor
}) {
  return (
    <Box
      backgroundColor={bgTableColor}
      borderBottom={`1px solid ${borderColor}`}
      _last={{ borderBottom: 'none', borderBottomRadius: 'xl' }}
    >
      <Box
        pl={16}
        py={4}
        pr={4}
        as={motion.div}
        whileHover={{ backgroundColor: bgHighlight }}
      >
        <Grid textColor={'black'} templateColumns="repeat(4, 1fr)">
          <GridItem colSpan={2}>
            <Link as={NextLink} href={`/projects/${project.id}`} _hover={{}}>
              <Text _hover={{ color: textHighlightColor }}>{project.title}</Text>
            </Link>
          </GridItem>

          <GridItem justifySelf={'center'}>
            {<ProjectStatus status={project.status} />}
          </GridItem>
          <GridItem justifySelf={'center'}>
            <Text>{project.difficulty}</Text>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

function ProjectStatus({ status }) {
  if (status === 'NOT_ATTEMPTED') {
    return (
      <Box color={'yellow.500'}>
        <IoHourglassSharp size={24} />
      </Box>
    )
  }

  if (status === 'PENDING') {
    return (
      <Box color={'yellow.500'}>
        <IoHourglassSharp size={24} />
      </Box>
    )
  }

  return (
    <Box color={'green.500'}>
      <IoCheckmarkDone size={24} />
    </Box>
  )
}

export default Projects
