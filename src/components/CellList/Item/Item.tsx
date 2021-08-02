import { Cell } from "../../../state";
import CodeCell from "../../CodeCell/CodeCell";
import TextEditor from "../../TextEditor/TextEditor";
import ActionBar from "../../ActionBar/ActionBar";
import "./Item.css";

interface ItemProps {
  cell: Cell;
}

const Item: React.FC<ItemProps> = ({ cell }) => {
  const child: JSX.Element =
    cell.type === "code" ? (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-list-item">{child}</div>;
};

export default Item;
