import React from 'react'

import Layout from '@/components/layouts/main'

import {
  Box,
  chakra,
  ListItem,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Button,
  TableContainer,
  Text
} from '@chakra-ui/react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'

import { useRouter } from 'next/router'
import {
  IoCaretDown,
  IoCaretUp,
  IoCheckmarkDone,
  IoHourglass
} from 'react-icons/io5'
import NextLink from 'next/link'

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

const RenderLinks = ({ title }) => {
  return (
    <Link
      as={NextLink}
      href={`/projects/${title.toLowerCase().replaceAll(' ', '-')}`}
      _hover={{ color: 'purple.600' }}
    >
      {title}
    </Link>
  )
}

const RenderStatus = ({ status }) => {
  return (
    status &&
    (status === 'done' ? (
      <IoCheckmarkDone size={20} color="green" />
    ) : (
      <IoHourglass size={20} color="orange" />
    ))
  )
}

const columnHelper = createColumnHelper<Questions>()

const columns = [
  columnHelper.accessor('title', {
    cell: info => <RenderLinks title={info.getValue()} />,
    header: 'Title'
  }),
  columnHelper.accessor('status', {
    cell: info => <RenderStatus status={info.getValue()} />,
    header: 'Status'
  }),
  columnHelper.accessor('difficulty', {
    cell: info => <Text casing={'capitalize'}>{info.getValue()}</Text>,
    header: 'Difficulty'
  })
]

const DataTable = ({ data, columns }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  return (
    <TableContainer>
      <Table size={'lg'} variant={'striped'}>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  _hover={{ cursor: 'pointer' }}
                >
                  <Box justifyContent={'center'} display={'flex'} style={{ gap: 4 }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <chakra.span
                      display={'flex'}
                      justifyContent={'center'}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <IoCaretDown aria-label="sorted descending" />
                        ) : (
                          <IoCaretUp aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  <Box display={'flex'} justifyContent={'center'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Projects = () => {
  return (
    <Layout title={'Project page'}>
      <Box m={4} h="100vh" top={24} position={'relative'} textAlign={'center'}>
        <Box p={4} m={4}>
          <DataTable columns={columns} data={data} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Projects
