import { Footer } from './components/footer/Footer'
import { Header } from './components/header/Header'
import { ModalContextProvider } from './contexts/ModalContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ModalContextProvider>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </ModalContextProvider>
    </html>
  )
}
