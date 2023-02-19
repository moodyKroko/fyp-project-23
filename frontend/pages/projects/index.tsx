import Layout from '@/components/layouts/main'
import {
    Box, Link,
    List,
    ListItem, Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td, Th,
    Thead,
    Tr
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const questions = [
  { id: 1, title: 'Hello World', status: 'done', difficulty: 'easy' },
  { id: 2, title: 'Testing', status: 'pending', difficulty: 'medium' },
  { id: 3, title: 'Two sum', status: '', difficulty: 'hard' },
  { id: 4, title: 'Algebra', status: '', difficulty: 'hard' }
]

export default function Projects() {
  const router = useRouter()
  //   const id = router.query.id

  const renderList = questions => {
    return questions.map(question => (
      <ListItem key={question.id}>
        <Link
          as={NextLink}
          href={`/projects/${question.title.toLowerCase().replaceAll(' ', '-')}`}
        >
          {question.id} {question.title} {question.status}
          {renderTable(question)}
        </Link>
      </ListItem>
    ))
  }

  const renderTable = props => {
    return (
      <>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Title</Th>
                <Th>Difficulty</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{props.status}</Td>
                <Td>{props.title}</Td>
                <Td>{props.difficulty}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </>
    )
  }

  return (
    <Layout title={'Project page'}>
      <Box m={4} h="100vh" top={24} position={'relative'} textAlign={'center'}>
        <Box p={4} m={4}>
          <List>{renderList(questions)}</List>
        </Box>
      </Box>
    </Layout>
  )
}
