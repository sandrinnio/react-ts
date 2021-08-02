import { useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../state";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles?.[cell.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
