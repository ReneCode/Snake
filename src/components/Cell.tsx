const Cell = ({ type }: { type: number }) => {
  let className = "";
  switch (type) {
    case 1:
      className = "cell-empty";
      break;
    case 2:
      className = "cell-snake";
      break;
    case 3:
      className = "cell-apple";
      break;
  }
  className += " cell";
  return <div className={className}></div>;
};

export default Cell;
