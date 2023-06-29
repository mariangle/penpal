import './globals.css'
import { Inter } from 'next/font/google'

import AuthContextProvider from '../context/AuthContext'
import ToastContextProvider from '../context/ToasterContext'
import UserContextProvider from '../context/UserContext'
import ReviewsContextProvider from '../context/ReviewsContext'

import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PenPal',
  description: 'Experience the nostalgia of writing a traditional letter in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.',
}

export default function RootLayout({ 
  children, authModal
}: { 
  children: React.ReactNode,
  authModal: React.ReactNode
 }) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ReviewsContextProvider>
          <html lang="en" className="h-full">
            <body className={`${inter.className} flex flex-col min-h-screen relative`}>
              <div className="main">
                  <div className="gradient"/>
              </div>
              {authModal}
              <main className='app'>
                <Navbar />
                <ToastContextProvider />
                {children}
              </main>
            </body>
          </html>
        </ReviewsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}