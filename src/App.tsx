import Navbar from "./components/Navbar";
import Main from "./components/Main";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      {/* main  */}
      <div className="md:h-[calc(100vh-100px)]">
        <Main />
      </div>
      {/* main  */}
    </div>
  );
}

export default App;
