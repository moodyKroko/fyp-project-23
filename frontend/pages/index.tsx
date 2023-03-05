import { comfortaa, secularone } from '@/lib/fonts'
import { Box, Stack, Text } from '@chakra-ui/react'

import Image from 'next/image'

import hero_1 from '../public/hero/hero_1.svg'
import hero_2 from '../public/hero/hero_2.svg'
import hero_3 from '../public/hero/hero_3.svg'

import Head from 'next/head'

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Proj2Learn | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn homepage" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction={'column'} spacing={44}>
        <Box top={32} position={'relative'} textAlign={'center'}>
          <Text
            p={2}
            m={4}
            alignSelf={'center'}
            className={secularone.className}
            fontSize="7xl"
            sx={{ textTransform: 'uppercase', letterSpacing: 7.5 }}
          >
            Learn by doing it.
          </Text>
        </Box>
        <Box mt={32} p={3} textAlign="center">
          <Box textAlign={'left'}>
            <Stack
              textAlign={'center'}
              align={'center'}
              justify={'space-between'}
              direction={'row-reverse'}
            >
              <Image src={hero_1} alt={'humaaans 1'} width={288} height={376} />
              <Box maxW={'2xl'}>
                <Text className={comfortaa.className} fontSize="4xl" noOfLines={3}>
                  Learn to code with our interactive, project-based courses.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Stack textAlign={'center'} align={'center'} direction={'row'}>
            <Image src={hero_2} alt={'humaaans 2'} width={556} height={445} />

            <Text className={comfortaa.className} fontSize="4xl" noOfLines={4}>
              Our coding platform gives you access to tutorials and challenges that
              will help you develop your coding skills.
            </Text>
          </Stack>
        </Box>

        <Box>
          <Stack textAlign={'center'} align={'center'} direction={'row'}>
            <Text className={comfortaa.className} fontSize="4xl" noOfLines={3}>
              With tailored support and guidance, you&apos;ll be able to master the
              basics of coding in no time.
            </Text>
            <Image src={hero_3} alt={'humaaans 3'} width={556} height={445} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
