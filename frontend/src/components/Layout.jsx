import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        {children}
      </div>

      <Footer />
    </>
  );
}

export default Layout;