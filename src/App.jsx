import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {LogReg} from "./components/LogReg.jsx";
import {Profile} from "./components/Profile.jsx";

function App() {
  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<LogReg />} />
                  <Route path="/my/profile" element={<Profile />} />
              </Routes>
          </Router>
      </div>
  )
}

export default App
