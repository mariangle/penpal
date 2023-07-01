import '@/styles/index.css'
import { Inter } from 'next/font/google'

import AuthContextProvider from '../context/AuthContext'
import ToastContextProvider from '../context/ToasterContext'
import UserContextProvider from '../context/UserContext'
import ReviewsContextProvider from '../context/ReviewsContext'

import Navbar from '../components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PenPal',
  description: 'Experience the nostalgia of writing a traditional letter in a digital world. Connect with penpals worldwide and enjoy the anticipation of heartfelt messages that arrive at their own pace.',
}

export default function RootLayout({ 
  children,
  reviewModal
}: { 
  children: React.ReactNode,
  reviewModal: React.ReactNode
 }) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ReviewsContextProvider>
          <html lang="en" className="h-full">
            <body className={`${inter.className} h-full`}>
              <div className="main">
                  <div className="gradient"/>
              </div>
              {reviewModal}
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