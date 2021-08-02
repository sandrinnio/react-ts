import { Cell } from "../../../state";
import CodeCell from "../../CodeCell/CodeCell";
import TextEditor from "../../TextEditor/TextEditor";

interface ItemProps {
  cell: Cell;
}

const Item: React.FC<ItemProps> = ({ cell }) => {
  const child: JSX.Element =
    cell.type === "code" ? (
      <CodeCell cell={cell} />
    ) : (
      <TextEditor cell={cell} />
    );
  return <div>{child}</div>;
};

export default Item;
