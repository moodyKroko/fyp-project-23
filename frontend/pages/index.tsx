import { comfortaa, secularone } from '@/lib/fonts'
import { Box, chakra, shouldForwardProp, Stack, Text } from '@chakra-ui/react'

import Image from 'next/image'

import hero_1 from '../public/hero/hero_1.svg'
import hero_2 from '../public/hero/hero_2.svg'
import hero_3 from '../public/hero/hero_3.svg'

import Head from 'next/head'
import { isValidMotionProp, motion } from 'framer-motion'

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const heroImageVariants = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    opacity: 1,
    x: 0,
    duration: 1,
    transition: {
      type: 'spring',
      delay: 0.5
    }
  }
}
const heroTextVariant = {
  hidden: {
    x: '100vw',
    opacity: 0
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.3
    }
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Proj2Learn | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn homepage" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction={'column'} justify={'center'}>
        <ChakraBox
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
          pt={16}
          position={'relative'}
          textAlign={'center'}
        >
          <Text
            p={2}
            m={4}
            alignSelf={'center'}
            style={secularone.style}
            fontSize="7xl"
            textShadow={'1px 1px 2px gray'}
            sx={{ textTransform: 'uppercase', letterSpacing: 7.5 }}
          >
            Learn by doing it.
          </Text>
        </ChakraBox>
        <Box p={4} textAlign="center">
          <Box mb={20} textAlign={'left'}>
            <Stack
              textAlign={'center'}
              align={'center'}
              justify={'space-between'}
              direction={'row-reverse'}
            >
              <ChakraBox
                variants={heroImageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={hero_1}
                  alt={'humaaans 1'}
                  //   width={287}
                  //   height={375}
                  //   style={{ height: 'auto' }}
                  loading="eager"
                />
              </ChakraBox>
              <ChakraBox
                variants={heroTextVariant}
                initial="hidden"
                animate="visible"
                maxW={'2xl'}
              >
                <Text
                  style={comfortaa.style}
                  fontSize="4xl"
                  noOfLines={3}
                  textShadow={'1px 1px 2px gray'}
                >
                  Learn to code with our interactive, project-based courses.
                </Text>
              </ChakraBox>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Stack
            p={4}
            mb={40}
            textAlign={'center'}
            align={'center'}
            direction={'row'}
          >
            <ChakraBox
              variants={heroImageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={hero_2}
                alt={'humaaans 2'}
                // width={556}
                // height={444}
                // style={{ height: 'auto' }}
                loading="eager"
              />
            </ChakraBox>
            <ChakraBox
              maxW={'2xl'}
              variants={heroTextVariant}
              initial="hidden"
              animate="visible"
            >
              <Text
                style={comfortaa.style}
                fontSize="4xl"
                noOfLines={4}
                textShadow={'1px 1px 2px gray'}
              >
                Our coding platform gives you access to tutorials and challenges that
                will help you develop your coding skills.
              </Text>
            </ChakraBox>
          </Stack>
        </Box>

        <Box>
          <Stack
            mt={32}
            mb={14}
            textAlign={'center'}
            align={'center'}
            direction={'row'}
          >
            <Text
              style={comfortaa.style}
              fontSize="4xl"
              noOfLines={3}
              textShadow={'1px 1px 2px gray'}
            >
              With tailored support and guidance, you&apos;ll be able to master the
              basics of coding in no time.
            </Text>
            <Image
              src={hero_3}
              alt={'humaaans 3'}
              //   width={0} // 556
              //   height={0} // 445
              //   style={{ height: '445', width: '556' }}
              //   loading="eager"
            />
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
