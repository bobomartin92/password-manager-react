
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './routes/Login.js';
import Signup from './routes/Signup.js';
import Password from './routes/Password.js';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password/:username" element={<Password />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
