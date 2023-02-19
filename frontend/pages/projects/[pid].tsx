import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Problem = () => {
  const router = useRouter()
  const { pid } = router.query

  const title = pid?.toString().replaceAll('-', ' ')

  return (
    <>
      <Text casing={'capitalize'}>Problem Title: {title}</Text>
    </>
  )
}

export default Problem
