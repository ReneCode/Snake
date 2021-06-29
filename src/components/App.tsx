import { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import { Direction } from "./Direction";
import { Snake } from "./Snake";

const App = () => {
  const TIME_INTERVAL = 1000;
  const MAX_ROW = 10;
  const MAX_COLUMN = 15;
  const CELL_EMPTY = 1;
  const CELL_SNAKE = 2;
  const CELL_APPLE = 3;

  const [cells, setCells] = useState<number[][]>([]);

  const [snake, setSnake] = useState(new Snake([{ r: 0, c: 0 }]));
  // const [snakeDirection, setSnakeDirection] = useState({ r: 0, c: 1 });
  const [direction, setDirection] = useState(() => {
    console.log("-----");
    return new Direction("right");
  });

  const [stop, setStop] = useState(false);

  const updateScene = () => {
    // move Snake
    console.log("dir:", direction);
    const newSnake = snake.move(direction);
    setSnake(newSnake);

    setDirection(new Direction("up"));

    // Snake hitting border ?
    const head = newSnake.head;
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
        if (newSnake.isHere({ c, r })) {
          val = CELL_SNAKE;
        }
        row.push(val);
      }
      cells.push(row);
    }
    setCells(cells);
  };

  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    console.log(event.key, direction);
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setDirection(direction.turn("left"));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      // setDirection(direction.turn("right"));
      setDirection(new Direction("up"));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateScene, TIME_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Board cells={cells}></Board>
      {stop && <h1>STOP</h1>}
    </div>
  );
};

export default App;
