import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar fixed to the left */}
      {showSidebar && (
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
      )}

      {/* Right section: content area */}
      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 overflow-y-auto">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
