import Button from "../shared/components/Button";

function DebugPanel() {
  return (
    <div className="h-full flex flex-col shadow-lg p-4">
      <h1 className="text-lg font-bold mb-4 text-gray-900">Snap Bug</h1>
      <div className="flex justify-between mt-auto pb-4">
        <Button>← Previous</Button>
        <Button>Next →</Button>
      </div>
    </div>
  );
}

export default DebugPanel;
