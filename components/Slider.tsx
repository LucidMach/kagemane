import { Dispatch, SetStateAction, useState } from "react";

interface props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}
const Slider: React.FC<props> = ({ value, setValue }) => {
  return (
    <div className="flex flex-col items-center w-full gap-2">
      <span className="font-bold">{value}&deg;</span>
      <input
        type="range"
        min="0"
        max="180"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        step="5"
        className="w-1/3 h-2 neumorphism bg-shikamaru-green-900 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;
