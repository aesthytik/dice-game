/* eslint-disable @typescript-eslint/ban-ts-comment */
import './die.css';

const Die = ({ face, rolling }: { face: string; rolling: boolean }) => {
  return (
    <div
      className={`Die h-40 w-40 mb-3 flex items-center justify-center bg-green-500 rounded-3xl text-white mr-5 ${
        rolling && 'Die-shaking'
      }`}
    >
      {face}
    </div>
  );
};

export default Die;
