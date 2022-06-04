const WIDTH = 10;
const BOMBAMOUNT = 20;

const shuffleArray = (array) => {
  let newArary = array;
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    let j = Math.floor(Math.random() * (i + 1));

    // Swap arr[i] with the element
    // at random index
    [newArary[i], newArary[j]] = [newArary[j], newArary[i]];
  }
  return newArary;
};

const createBoard = () => {
  let newboard = [];
  const bombArray = Array(BOMBAMOUNT).fill("bomb");
  const emptyArray = Array(WIDTH * WIDTH - BOMBAMOUNT).fill("valid");

  const gameArray = emptyArray.concat(bombArray);
  //   const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
  const shuffledArray = shuffleArray(gameArray);

  for (let i = 0; i < WIDTH * WIDTH; i++) {
    const square = {
      id: i,
      value: shuffledArray[i],
      checked: false,
      flag: false,
    };
    newboard.push(square);
  }

  for (let i = 0; i < newboard.length; i++) {
    let total = 0;
    const isLeftEdge = i % WIDTH === 0;
    const isRightEdge = (i - 9) % WIDTH === 0;

    if (newboard[i].value === "valid") {
      if (i > 0 && !isLeftEdge && newboard[i - 1].value === "bomb") total++; //left bomb
      if (i < 99 && !isRightEdge && newboard[i + 1].value === "bomb") total++; //right bomb
      if (i > 10 && newboard[i - WIDTH].value === "bomb") total++; //top bomb
      if (i < 89 && newboard[i + WIDTH].value === "bomb") total++; //bottom bomb
      if (i > 9 && !isRightEdge && newboard[i + 1 - WIDTH].value === "bomb")
        total++; //top right bomb
      if (i > 11 && !isLeftEdge && newboard[i - 1 - WIDTH].value === "bomb")
        total++; //top left bomb
      if (i < 90 && !isLeftEdge && newboard[i - 1 + WIDTH].value === "bomb")
        total++; //bottom left bomb
      if (i < 88 && !isRightEdge && newboard[i + 1 + WIDTH].value === "bomb")
        total++; //bottom right bomb
      newboard[i] = {
        ...newboard[i],
        data: total,
      };
    }
  }
  return newboard;
};

function listToMatrix(list, elementsPerSubArray) {
  var matrix = [],
    i,
    k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}

export { WIDTH, BOMBAMOUNT, createBoard, listToMatrix };
