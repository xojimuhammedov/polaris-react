import { Routes, Route } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Verify from './pages/Verify.jsx';
import Cabinet from './pages/Cabinet.jsx';
import Course from './pages/Course.jsx';
import Lesson from './pages/Lesson.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kirish" element={<Login />} />
        <Route path="/royxat" element={<Register />} />
        <Route path="/tasdiqlash" element={<Verify />} />
        <Route path="/kabinet" element={<Cabinet />} />
        <Route path="/kabinet/kurs" element={<Course />} />
        <Route path="/kabinet/dars" element={<Lesson />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
