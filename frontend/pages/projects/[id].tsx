import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  HStack,
  Kbd,
  shouldForwardProp,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useEventListener,
  useLatestRef
} from '@chakra-ui/react'

import { langs } from '@uiw/codemirror-extensions-langs'
import { atomone } from '@uiw/codemirror-theme-atomone'
import { githubLight } from '@uiw/codemirror-theme-github'
import CodeMirror from '@uiw/react-codemirror'
import axios from 'axios'
import { motion, isValidMotionProp } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IoCheckmarkDoneSharp, IoCloseSharp } from 'react-icons/io5'
import { useQuery } from 'react-query'

const baseUrl = 'http://localhost:8081'

const getProjectsById = async id => {
  const { data } = await axios.get(`${baseUrl}/project/${id}`)
  return data
}

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const titleAnimation = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const codeEditorAnimation = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.4,
      ease: 'easeInOut'
    }
  }
}

const btnAnimation = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 2,
      ease: 'easeInOut'
    }
  }
}
const consoleAnimation = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.7,
      ease: 'easeInOut'
    }
  }
}

function Problem() {
  const router = useRouter()
  const id = router.query.id as string

  const projectIdRef = useLatestRef(id)

  const { data, error, isLoading } = useQuery('project', () =>
    getProjectsById(Number(projectIdRef.current))
  )

  const [code, setCode] = useState('')
  const [result, setResult] = useState('Result from backend will show here!!')
  const [resultStatus, setResultStatus] = useState(0)

  const questionBgColor = useColorModeValue('#f2f2f2', '#4e5564')
  const { colorMode } = useColorMode()

  const handleChange = React.useCallback((value, viewUpdate) => {
    setCode(value)
  }, [])

  const submitSolution = () => {
    axios
      .post(`${baseUrl}/project/${id}/submit`, code, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(({ data, status }) => {
        setResult(data)
        setResultStatus(status)
      })
      .catch(error => {
        console.log(error.message)
        console.log(error.response.data)
        console.log(error.response.status)
      })
  }

  useEventListener('keydown', event => {
    if (event?.key?.toLowerCase() === 'enter' && event['ctrlKey']) {
      event.preventDefault()
      submitSolution()
    }
  })

  if (error)
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
    <Box display={'flex'} justifyContent={'center'}>
      <Head>
        <title>Project | {`${data.title.toUpperCase()} `}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn problems page" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={'container.xl'} mt={16}>
        <Stack>
          <ChakraBox variants={titleAnimation} initial="hidden" animate="visible">
            <Box
              w={'100%'}
              bg={questionBgColor}
              borderRadius={'lg'}
              shadow={'dark-lg'}
            >
              <Text p={4} fontSize={'2xl'}>
                Question: {data.title}
              </Text>
            </Box>
          </ChakraBox>

          {/* editor area */}
          <ChakraBox
            variants={codeEditorAnimation}
            initial="hidden"
            animate="visible"
          >
            <Box w={'100%'} h="50vh" borderRadius={'lg'} shadow={'dark-lg'}>
              <CodeMirror
                value={code}
                height="50vh"
                theme={colorMode === 'light' ? githubLight : atomone}
                onChange={handleChange}
                extensions={[langs.java()]}
              />
            </Box>
          </ChakraBox>

          {/* submit the code button */}
          <Flex align={'center'} flexDirection={'row-reverse'}>
            <Button
              as={'button'}
              type={'submit'}
              colorScheme={'purple'}
              onClick={submitSolution}
              shadow={'dark-lg'}
              autoFocus
            >
              Submit
            </Button>
            <ChakraBox variants={btnAnimation} initial="hidden" animate="visible">
              <Box pr={4}>
                <Kbd shadow={'dark-lg'}>Ctrl</Kbd>
                <span> + </span>
                <Kbd shadow={'dark-lg'} mr={4}>
                  Enter
                </Kbd>
                <span>to</span>
              </Box>
            </ChakraBox>
          </Flex>

          {/* error console */}
          <ChakraBox variants={consoleAnimation} initial="hidden" animate="visible">
            <Box
              w={'100%'}
              minH={40}
              bg={'black'}
              borderRadius={'lg'}
              shadow={'2xl'}
            >
              <Box p={4}>
                <ShowResult statusCode={resultStatus}>{result}</ShowResult>
              </Box>
            </Box>
          </ChakraBox>
        </Stack>
      </Container>
    </Box>
  )
}

const ShowResult = ({ children, statusCode }) => {
  if (statusCode === 200) {
    return (
      <HStack pl={4} align={'center'} color={'red.500'}>
        <IoCloseSharp size={28} />
        <Text color={'red.500'}>{children}</Text>
      </HStack>
    )
  }

  return (
    <HStack pl={4} align={'center'} color={'green.500'}>
      <IoCheckmarkDoneSharp />
      <Text color={'green.500'}>
        <span>{children}</span>
      </Text>
    </HStack>
  )
}

export default Problem
