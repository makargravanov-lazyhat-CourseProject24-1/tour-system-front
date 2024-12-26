import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {LogReg} from "./components/LogReg.jsx";
import {Profile} from "./components/Profile.jsx";
import "./App.css"
import {AgenciesPage} from "./components/Agencies.jsx";

function App() {
  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<LogReg />}/>
                  <Route path="/my/profile" element={<Profile/>}/>
                  <Route path="/my/agencies" element={<AgenciesPage/>}/>
              </Routes>
          </Router>
      </div>
  )
}

export default App
