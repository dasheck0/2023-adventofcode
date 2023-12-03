const { join } = require('path');
const fs = require('fs');

const lines = fs.readFileSync(join(__dirname, 'file.txt'), 'utf-8').split('\n');

const colors = ['red', 'green', 'blue'];
const maxCount = { red: 12, green: 13, blue: 14 };

const loadGame = line => {
  const gameNumber = parseInt(line.split(':')[0].split(' ')[1], 10);
  const games = line.split(':')[1].split(';');

  const gameResults = [];
  const maximum = { red: 0, green: 0, blue: 0 };

  for (let j = 0; j < games.length; j++) {
    const game = games[j];
    const result = { valid: true };

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const regex = new RegExp(`(\\d+) ${color}`);

      result[color] = 0;

      const match = game.match(regex);

      if (match) {
        result[color] = parseInt(match[1]);
        result.valid = result.valid && result[color] <= maxCount[color];

        maximum[color] = Math.max(maximum[color], result[color]);
      }
    }

    gameResults.push(result);
  }
  const power = maximum.red * maximum.blue * maximum.green;

  return { gameNumber, gameResults, valid: gameResults.every(result => result.valid), power, maximum };
};

const part01 = () => {
  const validResults = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const result = loadGame(line);
    console.log('rseu', result);

    if (result.valid) {
      validResults.push(result.gameNumber);
    }
  }

  const sum = validResults.reduce((a, b) => a + b, 0);

  console.log('sum', sum);
};

const part02 = () => {
  const allResults = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const result = loadGame(line);
    console.log('rseu', result);

    allResults.push(result.power);
  }

  const sum = allResults.reduce((a, b) => a + b, 0);

  console.log('sum', sum);
};

part02();
