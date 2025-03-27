import DebugPanel from "./components/DebugPanel";
import Footer from "./shared/components/Footer";
import "./styles/globals.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[30%] h-full overflow-hidden border-r border-gray-300">
          <DebugPanel />
        </div>
        <div className="w-[70%] bg-gray-100 p-6 h-full overflow-auto">
          <div id="style-container"></div>
          <div
            id="preview-container"
            className="bg-white p-4 mt-4 rounded shadow-inner h-full overflow-auto"
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
