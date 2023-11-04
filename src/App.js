import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Status from './components/Status/Status';
import Admin from './components/Admin/Admin';
import Statistics from './components/Admin/statistics';
import Statisticsusername from './components/Admin/statisticsusername';
import Statisticsaverageincome from './components/Admin/statisticsaverageincome';
import Statisticslesserincome from './components/Admin/statisticslesserincome';
import Statisticssame from './components/Admin/statisticssame';
function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status/:id" element={<Status />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/occupationcount" element={<Statistics />} />
        <Route path="/username" element={<Statisticsusername />} />
        <Route path="/averageincome" element={<Statisticsaverageincome />} />
        <Route path="/lesserincome" element={<Statisticslesserincome />} />
        <Route path="/sameincome" element={<Statisticssame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;