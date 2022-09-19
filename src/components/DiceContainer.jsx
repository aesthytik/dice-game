import React, { useEffect, useState } from 'react';
import DiceItem from './DiceItem';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

function DiceContainer({ result, values: mainValues, setValue }) {
  const faces = 6;
  const maxRollTimes = 10;

  const [intrvl, setIntrvl] = useState();
  const [valuesToLoad, setValuesToLoad] = useState(mainValues);
  const [diceFaceOne, setDiceFaceOne] = useState({ letter: 'A', face: 1 });
  const [diceFaceTwo, setDiceFaceTwo] = useState({ letter: 'D', face: 2 });
  const [diceFaceThree, setDiceFaceThree] = useState({ letter: 'L', face: 3 });
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (resultValues) => {
      setValue(resultValues);
      setValuesToLoad(resultValues.split(''));
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      rollDice(resultValues.split(''));
      stop();
    },
  });
  const { speak } = useSpeechSynthesis();

  console.log('valuesToLoad', valuesToLoad);

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [rollTimes, setRollTimes] = useState();

  const firstLetterArray = result.filter((item) =>
    item.includes(valuesToLoad?.[0]?.toLowerCase()),
  );
  const secondLetterArray = result.filter((item) =>
    item.includes(valuesToLoad?.[1]?.toLowerCase()),
  );
  const thirdLetterArray = result.filter((item) =>
    item.includes(valuesToLoad?.[2]?.toLowerCase()),
  );

  useEffect(() => {
    setValuesToLoad(mainValues);
  }, [mainValues]);

  useEffect(() => {
    if (rollTimes === 0) {
      clearInterval(intrvl);
      setBtnDisabled(false);
    }
  }, [intrvl, rollTimes]);

  function rollDice(values) {
    setBtnDisabled(true);
    clearInterval(intrvl);
    setDiceFaceOne({
      letter: 'A',
      face: Math.floor(Math.random() * faces) + 1,
    });
    setDiceFaceTwo({
      letter: 'D',
      face: Math.floor(Math.random() * faces) + 1,
    });
    setDiceFaceThree({
      letter: 'K',
      face: Math.floor(Math.random() * faces) + 1,
    });
    let counter = Math.floor(Math.random() * maxRollTimes + 1);
    setRollTimes(counter);
    const interval = setInterval(() => {
      setDiceFaceOne({
        letter: values[0].toUpperCase(),
        face:
          firstLetterArray[0].findIndex((letter) => letter === values[0]) + 1,
      });
      setDiceFaceTwo({
        letter: values[1].toUpperCase(),
        face:
          secondLetterArray[0].findIndex((letter) => letter === values[1]) + 1,
      });
      setDiceFaceThree({
        letter: values[2].toUpperCase(),
        face:
          thirdLetterArray[0].findIndex((letter) => letter === values[2]) + 1,
      });
      counter--;
      setRollTimes(counter);
    }, 300);
    const wordsToSpeak = values.join('');
    const wordsToSpeakWithSpaces = values.join(' ');
    speak({ text: `${wordsToSpeakWithSpaces} ${wordsToSpeak}` });
    setIntrvl(interval);
  }

  const dice = (
    <>
      <DiceItem
        letter={diceFaceOne.letter}
        face={diceFaceOne.face}
        letters={firstLetterArray[0] ?? []}
      />
      <DiceItem
        letter={diceFaceTwo.letter}
        face={diceFaceTwo.face}
        letters={secondLetterArray[0] ?? []}
      />
      <DiceItem
        letter={diceFaceThree.letter}
        face={diceFaceThree.face}
        letters={thirdLetterArray[0] ?? []}
      />
    </>
  );

  const rollButton = (
    <button
      className="bg-black rounded-md p-3 text-white mb-3"
      disabled={btnDisabled}
      onClick={() => rollDice(valuesToLoad)}
    >
      {btnDisabled}
      Roll Dice
    </button>
  );

  const speakWord = () => {
    if (!listening) {
      listen();
    } else {
      stop();
    }
  };

  return (
    <div className="main-container">
      <div className="main-dice-container">{dice}</div>
      <div className="button-container">{rollButton}</div>
      <button
        onClick={speakWord}
        className="bg-black rounded-md p-3 text-white"
      >
        {listening ? 'Stop' : 'Speak to create word'}
      </button>
    </div>
  );
}

export default DiceContainer;
