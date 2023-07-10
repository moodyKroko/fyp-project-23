import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from '@/lib/theme'
import Layout from '@/components/layouts/Layout'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRef } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const queryClientRef = useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <QueryClientProvider client={queryClientRef.current}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </ChakraProvider>
  )
}
