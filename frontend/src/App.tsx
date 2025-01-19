import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { config } from "./config";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Root } from "./routes/Root";
import { EditStudentProfile } from "./routes/student/EditStudentProfile";
import { StudentGuard } from "./routes/student/StudentGuard";
import { StudentProfile } from "./routes/student/StudentProfile";
import { MySubscriptions } from "./routes/student/subscriptions/MySubscriptions";
import { Subscribe } from "./routes/student/subscriptions/Subscribe";
import { Classes } from "./routes/teacher/classes/Classes";
import { ClassStudents } from "./routes/teacher/classes/Students";
import { AddExam } from "./routes/teacher/exams/AddExam";
import { EditExam } from "./routes/teacher/exams/EditExam";
import { Exams } from "./routes/teacher/exams/Exams";
import { NewSession } from "./routes/teacher/sessions/sessionComponents/NewSession";
import { Sessions } from "./routes/teacher/sessions/Sessions";
import { SessionReport } from "./routes/teacher/subscriptions/SessionReport";
import { SingleSession } from "./routes/teacher/subscriptions/SingleSession";
import { SubscriptionReport } from "./routes/teacher/subscriptions/SubscriptionReport";
import { Subscriptions } from "./routes/teacher/subscriptions/Subscriptions";
import { TeacherMainContext } from "./routes/teacher/TeacherMainContext";

function App() {
  return (
    <BrowserRouter basename={config.APP_BASENAME}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Root />} />

          {/* Teacher */}
          <Route path="teacher" element={<TeacherMainContext />}>
            <Route index element={<Exams />} />
            <Route path="classes" element={<Classes />}></Route>
            <Route path="class-students" element={<ClassStudents />}></Route>
            <Route path="exam" element={<AddExam />} />
            <Route path="exam/:id" element={<EditExam />} />
            <Route path="exam/:id/sessions" element={<Sessions />} />
            <Route path="exam/:id/sessions/add" element={<NewSession />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="subscriptions/:date" element={<SessionReport />} />
            <Route
              path="subscriptions/:date/:id"
              element={<SubscriptionReport />}
            />
            <Route
              path="subscription/:date/:id/questions"
              element={<SingleSession />}
            />
          </Route>

          {/* Student */}
          <Route path="student" element={<StudentGuard />}>
            <Route index element={<MySubscriptions />} />
            <Route path="subscribe/:id" element={<Subscribe />} />
            <Route path=":id/profile/details" element={<StudentProfile />} />
            <Route
              path=":id/profile/details/edit"
              element={<EditStudentProfile />}
            />
            <Route
              path="subscriptions/:date/:id"
              element={<SubscriptionReport />}
            />
          </Route>

          {/* Login */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
