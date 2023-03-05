import React from 'react'


import {
    Box,
    chakra, Link, Table, TableContainer, Tbody,
    Td, Text, Th,
    Thead,
    Tr
} from '@chakra-ui/react'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from '@tanstack/react-table'

import Head from 'next/head'
import NextLink from 'next/link'
import {
    IoCaretDown,
    IoCaretUp,
    IoCheckmarkDone,
    IoHourglass
} from 'react-icons/io5'

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
  const projectTitle = title.toLowerCase().replaceAll(' ', '-')

  return (
    <Link
      as={NextLink}
      href={`/projects/${projectTitle}`}
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
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'ID'
  }),
  columnHelper.accessor('title', {
    cell: info => <RenderLinks title={info.getValue()} />,
    header: 'Title'
  }),
  columnHelper.accessor('status', {
    cell: info => <RenderStatus status={info.getValue} />,
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
    <Box>
      <Head>
        <title>Project | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Proj2learn problems page" />
        <meta name="author" content="Russel Rai" />
        <meta name="author" content="moodykroko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={4} top={24} position={'relative'} textAlign={'center'}>
        <Box p={4} m={4}>
          <DataTable columns={columns} data={data} />
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
