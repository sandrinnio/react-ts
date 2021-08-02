import { Fragment } from "react";
import { useTypedSelector } from "../../hooks";
import Item from "./Item/Item";
import AddCell from "../AddCell/AddCell";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) =>
    cells?.order.map((id) => cells.data[id])
  );

  return (
    <div>
      <AddCell forceVisible={cells?.length === 0} prevCellId={null} />
      {cells?.map((cell) => (
        <Fragment key={cell.id}>
          <Item cell={cell} />
          <AddCell prevCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
