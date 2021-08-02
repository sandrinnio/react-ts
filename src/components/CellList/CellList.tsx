import { useTypedSelector } from "../../hooks/use-typed-selector";
import Item from "./Item/Item";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  return (
    <div>
      {cells?.map((cell) => (
        <Item key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default CellList;
