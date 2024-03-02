import './App.css';
import {Route,Routes} from "react-router-dom"
import Signup from './Logins/Signup';
import Signin from './Logins/Signin';
import HomePage from './Student/HomePage';
import EditImage from './Student/EditProfilePic';
import EditStudentProfile from './Student/EditStudentProfile';
import Landing from './Logins/LandingPage';
import ApplyHostel from './Student/ApplyHostel';
import FeedbackPage from './Student/FeedBackForm';
import Roomcomplaint from './Student/Roomcomplaint';
import LeaveApplication from './Student/LeaveApplication';
import PrintLeaveData from './Student/PrintLeaveApplications';
import PrintFeedBackData from './Student/PrintFeedBackData';
import PrintRoomComplaints from './Student/PrintRoomComplaint';
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element= {<Landing />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/signin" element= {<Signin />} />
        <Route path="/homepage" element= {<HomePage />} />
        <Route path="/editImage" element= {<EditImage />} />
        <Route path="/editStudentProfile" element= {<EditStudentProfile />} />
        <Route path="/applyHostel" element={<ApplyHostel />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/roomcomplaint" element={<Roomcomplaint />} />
        <Route path="/leaveapplication" element={<LeaveApplication />} />
        <Route path="/printLeaveData" element={<PrintLeaveData />} />
        <Route path="/printFeedbackData" element={<PrintFeedBackData />} />
        <Route path="/printRoomComplaints" element={<PrintRoomComplaints />} />
      </Routes>
    </div>
  );
}

export default App;
