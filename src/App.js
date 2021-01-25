import './App.css';
import Serp from './components/Serp' 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router> 
        <Switch>
          <Route path="/" component={Serp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
