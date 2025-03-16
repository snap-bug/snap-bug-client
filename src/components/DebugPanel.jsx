import { useState, useRef, useEffect } from "react";
import Button from "../shared/components/Button";
import TimeTravelBox from "./TimeTravelBox";
import historyData from "../public/mock-data/state-history.json";

function DebugPanel() {
  const firstComponent = historyData[0]?.changedComponents[0];
  const initialHistory = firstComponent ? firstComponent.stateHistory : [];
  const componentName = firstComponent?.name || "Unknown Component";

  const history = initialHistory;

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeTravelRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!timeTravelRefs.current[currentIndex] || !containerRef.current) return;

    const activeBox = timeTravelRefs.current[currentIndex];
    activeBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="h-full flex flex-col shadow-lg p-4">
      <h1 className="text-lg font-bold mb-4 text-gray-900">Snap Bug</h1>

      <div
        ref={containerRef}
        className="flex-1 space-y-4 overflow-y-auto"
      >
        {history.length > 0 ? (
          history.map((entry, index) => (
            <TimeTravelBox
              key={index}
              componentName={componentName}
              timestamp={entry.timestamp}
              state={entry.state}
              isActive={index === currentIndex}
              ref={(el) => (timeTravelRefs.current[index] = el)}
            />
          ))
        ) : (
          <p className="text-gray-500">state history empty</p>
        )}
      </div>

      <div className="flex justify-between mt-auto pb-4">
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex >= history.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

export default DebugPanel;
