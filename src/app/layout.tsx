import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// 1. Import the Navbar component
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Charity Platform',
  description: 'Support campaigns that matter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // ClerkProvider safely wraps the entire HTML document
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* 2. Place the Navbar right above the page content */}
          <Navbar />
          
          {/* This renders whatever page the user is currently on */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}