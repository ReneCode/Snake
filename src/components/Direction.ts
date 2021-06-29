export type DirectionType = "up" | "right" | "down" | "left";

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

  public turn(d: "right" | "left") {
    switch (d) {
      case "right":
        switch (this.value) {
          case "up":
            return new Direction("right");
          case "right":
            return new Direction("down");
          case "down":
            return new Direction("left");
          case "left":
            return new Direction("up");
        }
        break;
      case "left":
        switch (this.value) {
          case "up":
            return new Direction("left");
          case "left":
            return new Direction("down");
          case "down":
            return new Direction("right");
          case "right":
            return new Direction("up");
        }
    }
  }
}
