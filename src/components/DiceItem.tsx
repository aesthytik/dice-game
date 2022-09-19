import React from 'react';

const DiceItem = ({
  face,
  letters,
}: {
  letter: string;
  face: number;
  letters: string[];
}) => {
  return (
    <div className="mr-8">
      <div className="dice-container">
        <div className={`dice face-${face}`}>
          <div className="face-1">
            <div className="dot-container">
              <div className="text-6xl">{letters[0]}</div>
            </div>
          </div>
          <div className="face-3">
            <div className="dot-container">
              <div className="text-6xl">{letters[2]}</div>
            </div>
          </div>
          <div className="face-4">
            <div className="dot-container">
              <div className="text-6xl">{letters[3]}</div>
            </div>
          </div>
          <div className="face-2">
            <div className="dot-container">
              <div className="text-6xl">{letters[1]}</div>
            </div>
          </div>
          <div className="face-5">
            <div className="dot-container">
              <div className="text-6xl">{letters[4]}</div>
            </div>
          </div>
          <div className="face-6">
            <div className="dot-container">
              <div className="text-6xl">{letters[5]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceItem;
