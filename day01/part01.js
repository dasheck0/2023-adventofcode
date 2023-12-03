const { join } = require('path');
const fs = require('fs');

const input = fs.readFileSync(join(__dirname, './file.txt'), 'utf8');
const lines = input.split('\n');

const isNumber = character => {
  return character == parseInt(character, 10);
};

const part01 = () => {
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const characters = line.split('');
    const digits = characters.filter(character => isNumber(character));

    console.log('line', line, digits);

    const newNumber = parseInt(digits[0] + digits[digits.length - 1]);
    sum += newNumber;
    console.log('nre', newNumber);
  }

  console.log('sum', sum);
};

 // const lines = ['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen'];

const part02 = () => {
  let sum = 0;

  const spelled = [
    { name: 'one', value: '1' },
    { name: 'two', value: '2' },
    { name: 'three', value: '3' },
    { name: 'four', value: '4' },
    { name: 'five', value: '5' },
    { name: 'six', value: '6' },
    { name: 'seven', value: '7' },
    { name: 'eight', value: '8' },
    { name: 'nine', value: '9' },
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const characters = line.split('');

    const digits = [];
    let word = '';

    for (let j = 0; j < characters.length; j++) {
      const character = characters[j];

      if (character == parseInt(character, 10)) {
        digits.push(character);
        word = '';
        continue;
      }

      word += character;
      const match = spelled.find(item => word.includes(item.name));

      if (match) {
        digits.push(match.value);
        word = character;
        continue;
      }
    }

    const newNumber = parseInt(digits[0] + digits[digits.length - 1]);
    sum += newNumber;

    console.log('line', line, digits, newNumber, sum);
  }

  console.log("Sum", sum);
};

part02();
