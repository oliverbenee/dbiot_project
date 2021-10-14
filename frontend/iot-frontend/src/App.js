import "./App.css";
import Homepage from "../src/components/pages/Homepage";
import Header from "./components/layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import History from "../src/components/pages/History";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/history" component={() => <History />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
