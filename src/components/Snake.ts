import { Direction, DirectionType } from "./Direction";

type SnakePartType = { r: number; c: number };

export type SnakeType = SnakePartType[];

export const snakeMove = (snake: SnakeType, direction: DirectionType) => {
  if (snake.length === 0) {
    throw Error("bad snake parts");
  }
  const head = snake[0];
  switch (direction) {
    case "up":
      head.r -= 1;
      break;
    case "right":
      head.c += 1;
      break;
    case "down":
      head.r += 1;
      break;
    case "left":
      head.c -= 1;
      break;
    default:
      throw new Error("snakeMove: bad direction");
  }

  const newSnake = [...snake];
  newSnake.unshift(head);
  newSnake.pop();
  return newSnake;
};

export const snakeIsHere = (snake: SnakeType, pos: SnakePartType) => {
  for (let part of snake) {
    if (part.c === pos.c && part.r === pos.r) {
      return true;
    }
  }
  return false;
};
