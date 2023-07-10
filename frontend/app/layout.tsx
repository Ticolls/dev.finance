

import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { AuthContextProvider } from './contexts/AuthContext'
import { ModalContextProvider } from './contexts/ModalContext'
import { TransactionsContextProvider } from './contexts/TransactionsContext'
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <AuthContextProvider>
        <TransactionsContextProvider>
          <ModalContextProvider>
            <body>
              <Header />
              {children}
              <Footer />
            </body>
          </ModalContextProvider>
        </TransactionsContextProvider>
      </AuthContextProvider>
    </html>
  )
}
