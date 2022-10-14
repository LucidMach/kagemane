import React, { useEffect, useState } from "react";

interface props {
  onClick: () => void;
}

const ToggleSwitch: React.FC<props> = ({ onClick }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled === true) {
      console.log("Redirecting to Bot");
      onClick();
    }
  }, [enabled]);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex gap-2 font-bold flex-col items-center">
        Verify WebSocket Connection
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
              setEnabled(!enabled);
            }}
            className="w-11 h-6 bg-shikamaru-green-500 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-shikamaru-green-900"
          ></div>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
