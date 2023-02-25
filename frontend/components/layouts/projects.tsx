import Footer from '../footer'
import Navbar from '../navbar'

const Layout = ({ children, title }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
