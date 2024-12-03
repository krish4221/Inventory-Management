import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

function provider({children}:{children:ReactNode}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default provider
