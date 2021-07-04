import { useEffect, useState } from "react";
import Board from "./Board";
import { directionTurn, DirectionType } from "./Direction";
import { snakeIsHere, snakeMove, SnakeType } from "./Snake";
import { useInterval } from "./useInterval";

const App = () => {
  const TIME_INTERVAL = 200;
  const MAX_ROW = 20;
  const MAX_COLUMN = 25;
  const CELL_EMPTY = 1;
  const CELL_SNAKE = 2;
  const CELL_APPLE = 3;

  const [cells, setCells] = useState<number[][]>([]);

  const [snake, setSnake] = useState<SnakeType>([{ c: 4, r: 4 }]);
  const [direction, setDirection] = useState<DirectionType>("right");
  const [stop, setStop] = useState(false);

  const updateScene = () => {
    // move Snake
    const newSnake = snakeMove(snake, direction);
    setSnake(newSnake);

    // Snake hitting border ?
    const head = snake[0];
    if (head.c < 0 || head.r < 0 || head.c >= MAX_COLUMN || head.r >= MAX_ROW) {
      setStop(true);
      return;
    }

    // new board
    const cells = [];
    for (let r = 0; r < MAX_ROW; r++) {
      const row = [];
      for (let c = 0; c < MAX_COLUMN; c++) {
        let val = CELL_EMPTY;
        if (snakeIsHere(newSnake, { c, r })) {
          val = CELL_SNAKE;
        }
        row.push(val);
      }
      cells.push(row);
    }
    setCells(cells);
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setDirection((direction) => directionTurn(direction, "left"));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setDirection((direction) => directionTurn(direction, "right"));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useInterval(() => {
    updateScene();
  }, TIME_INTERVAL);

  return (
    <div>
      <Board cells={cells}></Board>
      {direction}
      {stop && <h1>STOP</h1>}
    </div>
  );
};

export default App;
