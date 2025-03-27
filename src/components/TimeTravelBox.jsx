import PropTypes from "prop-types";
import { forwardRef } from "react";
import { formatToISO } from "../utils/dateUtils";

function TimeTravelBox(
  { componentName, timestamp, state, isActive, onClick },
  ref,
) {
  const formattedState = JSON.stringify(state, null, 2);
  const formattedTime = formatToISO(timestamp);

  return (
    <div
      ref={ref}
      onClick={onClick}
      tabIndex={isActive ? 0 : -1}
      className={`cursor-pointer w-full rounded-lg p-4 shadow-md transition-all duration-300 ${
        isActive ? "bg-yellow-400" : "bg-yellow-200"
      }`}
    >
      <h3 className="text-lg font-bold text-gray-900">{componentName}</h3>
      <p className="text-sm text-gray-700">Time: {formattedTime}</p>
      <div className="mt-2 bg-white p-2 rounded">
        <pre className="text-xs text-gray-900">{formattedState}</pre>
      </div>
    </div>
  );
}

TimeTravelBox.propTypes = {
  componentName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

TimeTravelBox.defaultProps = {
  state: {},
  isActive: false,
};

export default forwardRef(TimeTravelBox);
