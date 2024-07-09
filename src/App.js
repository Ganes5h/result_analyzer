import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Register from "./components/Register";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./components/Course";
import Student from "./components/Student";
import { Toaster } from "sonner";
import LandingPage from "./components/Landing";
import ResultView from "./components/ResultViewTeacher";
import TeacherDashboard from "./components/TeacherDashboard";
import Toppers from "./components/Toppers";
import StudentViewResult from "./components/ResultViewStudent";
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/view-result" element={<ResultView />}></Route>
            <Route
              path="/view-result-student"
              element={<StudentViewResult />}
            ></Route>
            <Route path="/toppers" element={<Toppers />}></Route>
            <Route
              path="/teacher-dashboard"
              element={<TeacherDashboard />}
            ></Route>
            <Route path="/" element={<LandingPage />}></Route>
            {/* <Route path="/register" element={<Register />}></Route> */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/student" element={<Student />} />
              <Route path="/courses" element={<Courses />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </Provider>
    </>
  );
}

export default App;
