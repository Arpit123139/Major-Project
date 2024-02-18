import './App.css';
import {Route,Routes} from "react-router-dom"
import Signup from './Logins/Signup';
import Signin from './Logins/Signin';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element= {<Signup />} />
        <Route path="/signin" element= {<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
