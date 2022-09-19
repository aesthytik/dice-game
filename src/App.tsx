import { useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import RollDice from './components/RollDice';
// import { take } from 'lodash';
library.add(fas);

function App() {
  const [value, setValue] = useState('');
  const values = value.split('');
  // console.log('values', values);
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabets = alpha.map((x) => String.fromCharCode(x));
  const n = 5;
  const result: string[][] = [[], [], [], [], []]; //we create it, then we'll fill it
  const wordsPerLine = Math.ceil(alphabets.length / n);
  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const item = alphabets[i + line * wordsPerLine];
      if (!item) continue; //avoid adding "undefined" values
      result[line].push(item);
    }
  }

  const diceOneCharacters = ['a', 'e', 'i', 'o', 'u', 'y'];
  const diceTwoCharacters = ['b', 'c', 'd', 'f', 'g', 'h'];
  const diceThreeCharacters = ['j', 'k', 'l', 'm', 'n', 'p'];
  const diceFourCharacters = ['r', 's', 't', 'v', 'w', 'z'];

  return (
    <div className="App">
      <section className="text-gray-600 body-font overflow-hidden mx-auto max-w-screen-xl">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="w-full p-12 focus:border-gray-500 active:border-gray-500">
              <input
                className="border-2 p-3 h-12 w-full"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <RollDice
                sides={['one', 'two', 'three', 'four', 'five', 'six']}
                result={[
                  diceOneCharacters,
                  diceTwoCharacters,
                  diceThreeCharacters,
                  diceFourCharacters,
                ]}
                setValue={setValue}
                values={values}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const AppContainer = () => {
  return <App />;
};

export default AppContainer;
