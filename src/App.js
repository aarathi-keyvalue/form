import { HashRouter as Router } from "react-router-dom";
import RouteLayout from "./routes/RouteLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <RouteLayout />
      </Router>
    </div>
  );
}

export default App;
