import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Login } from "./routes/Login";
import { Root } from "./routes/Root";
import { StudentGuard } from "./routes/student/StudentGuard";
import { MySubscriptions } from "./routes/student/subscriptions/MySubscriptions";
import { Subscribe } from "./routes/student/subscriptions/Subscribe";
import { AddExam } from "./routes/teacher/exams/AddExam";
import { EditExam } from "./routes/teacher/exams/EditExam";
import { Exams } from "./routes/teacher/exams/Exams";
import { SessionReport } from "./routes/teacher/subscriptions/SessionReport";
import { SubscriptionReport } from "./routes/teacher/subscriptions/SubscriptionReport";
import { Subscriptions } from "./routes/teacher/subscriptions/Subscriptions";
import { TeacherGuard } from "./routes/teacher/TeacherGuard";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Root />} />

          {/* Teacher */}
          <Route path="teacher" element={<TeacherGuard />}>
            <Route index element={<Exams />} />
            <Route path="exam" element={<AddExam />} />
            <Route path="exam/:id" element={<EditExam />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="subscriptions/:date" element={<SessionReport />} />
            <Route
              path="subscriptions/:date/:id"
              element={<SubscriptionReport />}
            />
          </Route>

          {/* Student */}
          <Route path="student" element={<StudentGuard />}>
            <Route index element={<MySubscriptions />} />
            <Route path="subscribe/:id" element={<Subscribe />} />
            <Route
              path="subscriptions/:date/:id"
              element={<SubscriptionReport />}
            />
          </Route>

          {/* Login */}
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
