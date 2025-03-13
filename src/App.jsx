import Debug from "./pages/Debug";
import DebugPanel from "./components/DebugPanel";
import Footer from "./shared/components/Footer";
import "./styles/globals.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow h-3/4">
        <div className="w-4/12">
          <DebugPanel />
        </div>
        <div className="w-8/12">
          <Debug />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
