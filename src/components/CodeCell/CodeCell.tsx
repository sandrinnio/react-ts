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
  const cumulativeCode: string[] = useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      const orderedCells = order.map((id) => data[id]);

      const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `;
      const showFuncNoop = `var show = () => {}`;
      const cumulativeCode: string[] = [];
      for (const orderedCell of orderedCells) {
        if (orderedCell.type === "code") {
          if (orderedCell.id === cell.id) {
            cumulativeCode.push(showFunc);
          } else {
            cumulativeCode.push(showFuncNoop);
          }
          cumulativeCode.push(orderedCell.content);
        }
        if (orderedCell.id === cell.id) {
          break;
        }
      }
      return cumulativeCode;
    }
    return [""];
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(() => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join("\n"), createBundle]);

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
