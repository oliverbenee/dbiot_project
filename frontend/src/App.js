import "./App.css";
import Homepage from "./components/pages/homepage.component";
import Header from "./components/layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import History from "./components/pages/history.component";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GarageDetails from "./components/pages/garage.detail.component";
import Title from "./components/layouts/Title";

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/history" component={History} />
          <Route exact path="/garage" component={GarageDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
