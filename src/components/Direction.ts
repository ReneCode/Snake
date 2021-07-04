export type DirectionType = "up" | "right" | "down" | "left";

export const directionTurn = (
  direction: DirectionType,
  turn: "left" | "right"
) => {
  switch (turn) {
    case "right":
      switch (direction) {
        case "up":
          return "right";
        case "right":
          return "down";
        case "down":
          return "left";
        case "left":
          return "up";
      }
      break;
    case "left":
      switch (direction) {
        case "up":
          return "left";
        case "left":
          return "down";
        case "down":
          return "right";
        case "right":
          return "up";
      }
  }
};

export class Direction {
  private value: DirectionType;

  constructor(value: DirectionType) {
    this.value = value;
  }

  public getMove() {
    switch (this.value) {
      case "right":
        return { c: 1, r: 0 };
      case "left":
        return { c: -1, r: 0 };
      case "up":
        return { c: 0, r: -1 };
      case "down":
        return { c: 0, r: 1 };
      default:
        return { c: 0, r: 0 };
    }
  }

  public turn(d: "right" | "left") {}
}
