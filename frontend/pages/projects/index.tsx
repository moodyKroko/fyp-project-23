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
  Link
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
import { IoCaretDown, IoCaretUp } from 'react-icons/io5'
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

const RenderLinks = (data: Questions[]) => {
  return data.map(question => (
    <ListItem key={question.id}>
      <Link
        as={NextLink}
        href={`/projects/${question.title.toLowerCase().replaceAll(' ', '-')}`}
      >
        {question.title}
      </Link>
    </ListItem>
  ))
}

const columnHelper = createColumnHelper<Questions>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'No',
    meta: {
      isNumeric: true
    }
  }),
  columnHelper.accessor('status', {
    cell: info => info.getValue(),
    header: 'Status'
  }),
  columnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'Title'
  }),
  columnHelper.accessor('difficulty', {
    cell: info => info.getValue(),
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
    <Table>
      <Thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const meta: any = header.column.columnDef.meta
              return (
                <>
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    {
                      <chakra.span display={'inline-flex'} pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <IoCaretDown aria-label="sorted descending" />
                          ) : (
                            <IoCaretUp aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    }
                  </Th>
                </>
              )
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map(row => (
          <Tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              const meta: any = cell.column.columnDef.meta
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
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
