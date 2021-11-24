import "./App.css";
import Homepage from "./components/pages/homepage.component";
import Header from "./components/layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Title from "./components/layouts/Title";
import Garage from "./components/pages/garage.component";

function App() {
  return (
    <BrowserRouter>
      <Title />
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/garage" component={Garage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
