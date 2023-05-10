import TextEditor from "./TextEditor";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom"
// import { v4 as uuidV4 } from "uuid"

function App() {
  return (  
    <Router>
      <Routes>
        {/* <Route path="/" exact element={<Navigate to={`/documents/${uuidV4()}`} /> }/> */}
        <Route path="/" exact element={<HomePage />}/>
        <Route path="/documents/:id" element={<TextEditor />}/>
      </Routes>
    </Router>
  )
}

export default App;
