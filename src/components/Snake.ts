import { Direction } from "./Direction";

type SnakePartType = { r: number; c: number };

export class Snake {
  parts: SnakePartType[] = [];

  constructor(parts: SnakePartType[]) {
    this.parts = [...parts];
  }

  public get head() {
    return this.parts[0];
  }

  public move(direction: Direction) {
    if (this.parts.length === 0) {
      throw Error("bad snake parts");
    }
    const snakeHead = this.parts[0];
    const move = direction.getMove();
    snakeHead.c += move.c;
    snakeHead.r += move.r;
    const newParts = [...this.parts];
    newParts.unshift(snakeHead);
    newParts.pop();
    return new Snake(newParts);
  }

  isHere(pos: { c: number; r: number }) {
    for (let part of this.parts) {
      if (part.c === pos.c && part.r === pos.r) {
        return true;
      }
    }
    return false;
  }
}
