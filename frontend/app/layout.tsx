import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { ModalContextProvider } from './contexts/ModalContext'
import { TransactionsContextProvider } from './contexts/TransactionsContext'
import './globals.css'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <TransactionsContextProvider>
        <ModalContextProvider>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </ModalContextProvider>
      </TransactionsContextProvider>
    </html>
  )
}
