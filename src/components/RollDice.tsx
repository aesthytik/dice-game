import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

import Die from './Die';

const RollDice = ({ result, values: mainValues, setValue }: any) => {
  const [die1, setDie1] = useState(result[0][0].toUpperCase());
  const [die2, setDie2] = useState(result[1][0].toUpperCase());
  const [die3, setDie3] = useState(result[2][0].toUpperCase());
  const [rolling, setRolling] = useState(false);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (resultValues: any) => {
      setValue(resultValues);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      roll(resultValues.split(''));
      stop();
    },
  });
  const { speak } = useSpeechSynthesis();

  // useEffect(() => {

  // }, [values]);

  const roll = useCallback(
    (values: any) => {
      if (values.length === 3) {
        setRolling(true);
        const hasFirstLetterArray = result.filter((item: any) =>
          item.includes(values[0].toLowerCase()),
        );
        const hasSecondLetterArray = result.filter((item: any) =>
          item.includes(values[1].toLowerCase()),
        );
        const hasThirdLetterArray = result.filter((item: any) =>
          item.includes(values[2].toLowerCase()),
        );
        console.log(
          'hasFirstLetterArray',
          hasFirstLetterArray,
          hasSecondLetterArray,
          hasThirdLetterArray,
        );

        setDie1(values[0].toUpperCase());
        setDie2(values[1].toUpperCase());
        setDie3(values[2].toUpperCase());

        console.log('values', values);

        const wordsToSpeak = values.join('');
        const wordsToSpeakWithSpaces = values.join(' ');
        // Start timer of one sec when rolling start
        setTimeout(() => {
          // Set rolling to false again when time over
          setRolling(false);
          speak({ text: `${wordsToSpeakWithSpaces} ${wordsToSpeak}` });
        }, 1000);
      }
    },
    [result, speak],
  );

  const speakWord = () => {
    if (!listening) {
      listen();
    } else {
      stop();
    }
  };

  const handleBtn = rolling ? 'RollDice-rolling' : '';

  // console.log('result', result, values);

  return (
    <div className="RollDice">
      <div className="RollDice-container flex-wrap  p-12">
        <Die face={die1} rolling={rolling} />
        <Die face={die2} rolling={rolling} />
        <Die face={die3} rolling={rolling} />
      </div>
      <button
        className={handleBtn}
        disabled={rolling}
        onClick={() => roll(mainValues)}
      >
        {rolling ? 'Rolling' : 'Roll dice to narrate'}
      </button>
      <button onClick={speakWord}>
        {listening ? 'Stop' : 'Speak to create word'}
      </button>
    </div>
  );
};

export default RollDice;
