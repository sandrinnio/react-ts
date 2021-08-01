import ReactDOM from "react-dom";
import TextEditor from "./components/TextEditor/TextEditor";
import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
