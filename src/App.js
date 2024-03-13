import "./App.css";
import MyNotes from "./components/MyNotes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/Notes/NoteState";
import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNotebook" mode="dark"></Navbar>
          <Alert message="This is amazing React course" />
          {/* <LoadingBar
      color="#f11946"
      height={3}
      progress={this.state.progress}
    /> */}
          {
            <Routes>
              <Route exact path="/" element={<MyNotes key="mynotes" />} />
              <Route exact path="/login" element={<Login key="login" />} />
              <Route exact path="/signup" element={<Signup key="signup" />} />
            </Routes>
          }
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
