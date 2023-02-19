import Layout from '@/components/layouts/main'
import {
  Box,
  Link,
  List,
  ListItem,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

type Questions = {
  id: number
  title: string
  status: string
  difficulty: string
}

const data: Questions[] = [
  { id: 1, title: 'Hello World', status: 'done', difficulty: 'easy' },
  { id: 2, title: 'Testing', status: 'pending', difficulty: 'medium' },
  { id: 3, title: 'Two sum', status: '', difficulty: 'hard' },
  { id: 4, title: 'Algebra', status: '', difficulty: 'hard' }
]

const DataTable = ({ data, columns }) => {}

const renderList = (data: Questions[]) => {
  return data.map(question => (
    <ListItem key={question.id}>
      <Link
        as={NextLink}
        href={`/projects/${question.title.toLowerCase().replaceAll(' ', '-')}`}
      >
        {question.id} {question.title} {question.status}
      </Link>
    </ListItem>
  ))
}

const Projects = () => {
  const router = useRouter()
  //   const id = router.query.id

  return (
    <Layout title={'Project page'}>
      <Box m={4} h="100vh" top={24} position={'relative'} textAlign={'center'}>
        <Box p={4} m={4}>
          <List>{renderList(data)}</List>
        </Box>
      </Box>
    </Layout>
  )
}

export default Projects
