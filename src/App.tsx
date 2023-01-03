import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="">
      <Navbar />
      {/* main  */}
      <div className="md:h-[calc(100vh-100px)]">
        <Main />
      </div>
      {/* main  */}
      <Footer />
    </div>
  );
}

export default App;
