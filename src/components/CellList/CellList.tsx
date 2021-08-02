import { Fragment } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import Item from "./Item/Item";
import AddCell from "../AddCell/AddCell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  return (
    <div>
      {cells?.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell nextCellId={cell.id} />
          <Item cell={cell} />
        </Fragment>
      ))}
      <AddCell forceVisible={cells?.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
