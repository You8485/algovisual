function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}


const isSafe = (queenPos = [], newPos = {}) => {
  for (let i = 0; i < queenPos.length; i++) {
    const pos = queenPos[i];
    if (isUnderAttack(newPos, pos)) {
      return false;
    }
  }
  return true;
};


export const nqueen = async (n, queenPos = [], col, setQueenPos) => {
  console.log(queenPos.length, parseInt(n));
  if (queenPos.length == parseInt(n)) {
    console.log(queenPos);
    return { solved: true, queenPos: queenPos };
  }
  for (let i = 0; i < n; i++) {
    const newPos = { x: col, y: i };
    const safeCheck = isSafe(queenPos, newPos);
    if (safeCheck) {
      queenPos.push(newPos);
      setQueenPos([...queenPos]);
      await sleep(1);
      const res = await nqueen(n, queenPos, col + 1, setQueenPos);
      if (res.solved) {
        return res;
      }

      queenPos.pop();
      await sleep(0.25);
      setQueenPos([...queenPos]);
    }
  }
  return { solved: false, queenPos: queenPos };
};

const isUnderAttack = (newPos, queenPosition) => {
  const d1 = newPos.x - newPos.y;
  const d2 = newPos.x + newPos.y;
  return (
    queenPosition.x + queenPosition.y == d2 ||
    queenPosition.x - queenPosition.y == d1 ||
    queenPosition.x == newPos.x ||
    queenPosition.y == newPos.y 
    
  );
};

