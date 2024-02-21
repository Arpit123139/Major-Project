import './App.css';
import {Route,Routes} from "react-router-dom"
import Signup from './Logins/Signup';
import Signin from './Logins/Signin';
import HomePage from './Student/HomePage';
import EditImage from './Student/EditProfilePic';
import EditStudentProfile from './Student/EditStudentProfile';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element= {<Signup />} />
        <Route path="/signin" element= {<Signin />} />
        <Route path="/homepage" element= {<HomePage />} />
        <Route path="/editImage" element= {<EditImage />} />
        <Route path="/editStudentProfile" element= {<EditStudentProfile />} />
      </Routes>
    </div>
  );
}

export default App;
