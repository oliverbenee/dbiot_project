import "./App.css";
import Homepage from "./components/pages/homepage.component";
import Header from "./components/layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import History from "./components/pages/history.component";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GarageDetails from "./components/pages/garage.detail.component";

const array1 = [25, 50, 35, 15, 94, 10, 40];
const array2 = [45, 60, 15, 45, 74, 5, 30];
const array3 = [34, 64, 20, 10, 10, 35, 60];

function App() {
  return (
    <BrowserRouter>
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
