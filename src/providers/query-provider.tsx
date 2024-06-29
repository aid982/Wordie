'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const client = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
}

export default Providers