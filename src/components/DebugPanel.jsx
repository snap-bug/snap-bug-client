import { useState, useRef, useEffect } from "react";
import Button from "../shared/components/Button";
import TimeTravelBox from "./TimeTravelBox";

function DebugPanel() {
  const [stateHistory, setStateHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeTravelRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchStateHistory = async () => {
      try {
        const response = await fetch("/snapbug-state.json");

        if (!response.ok) {
          throw new Error("상태 히스토리를 불러오는데 실패했습니다.");
        }

        const historyData = await response.json();

        setStateHistory(historyData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStateHistory();
  }, []);

  useEffect(() => {
    const activeBox = timeTravelRefs.current[currentIndex];
    if (activeBox && containerRef.current) {
      activeBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const currentSnapshot = stateHistory[currentIndex];
    if (!currentSnapshot) return;

    const { dom, styles } = currentSnapshot;

    const previewContainer = document.getElementById("preview-container");
    const styleContainer = document.getElementById("style-container");

    if (previewContainer) {
      previewContainer.innerHTML =
        dom || "<div class='text-red-500'>DOM 없음</div>";
    }

    if (styleContainer) {
      styleContainer.innerHTML = styles || "";
    }
  }, [currentIndex, stateHistory]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stateHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="h-full flex flex-col shadow-lg p-4">
      <h1 className="text-lg font-bold mb-4 text-gray-900">Snap Bug</h1>

      <div ref={containerRef} className="flex-1 space-y-4 overflow-y-auto">
        {stateHistory.length > 0 ? (
          stateHistory.map((snapshot, index) => (
            <TimeTravelBox
              key={snapshot.id || index}
              componentName="App"
              timestamp={snapshot.timestamp}
              state={snapshot.state}
              isActive={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              ref={(el) => (timeTravelRefs.current[index] = el)}
            />
          ))
        ) : (
          <p className="text-gray-500">state history empty</p>
        )}
      </div>

      <div className="flex justify-between mt-auto pb-4">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || stateHistory.length === 0}
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            currentIndex >= stateHistory.length - 1 || stateHistory.length === 0
          }
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

export default DebugPanel;
