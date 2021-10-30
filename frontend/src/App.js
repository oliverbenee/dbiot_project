import "./App.css";
import Homepage from "./components/pages/homepage.component";
import Header from "./components/layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import History from "./components/pages/history.component";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/history" component={History} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
