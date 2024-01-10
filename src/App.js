import { BrowserRouter, Routes, Route }
  from "react-router-dom";
import { useState } from "react"
import Home from './Pages/Home';
import CreateYourStory from './Pages/CreateYourStory'
import FamousFolktails from './Pages/FamousFolktales'
import ContactUs from './Pages/ContactUs'
import NotFound from './Pages/NotFound'
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Header from "./Components/layouts/Header";
import SaveStories from "./Pages/SaveStories";
import NoteState from './context/notes/storyState';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SingleStory from "./Pages/SingleStory";
import Alert from "./Components/Alert";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      {/* <LoginSocialFacebook appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}> */}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <NoteState>
          <BrowserRouter>
            <div className="w-auto mx-auto">
              <Header />
              <Alert alert={alert} />
              <Routes>
                <Route path="/" element={<Home showAlert={showAlert} />} />
                <Route path="/createyourstory" element={<CreateYourStory showAlert={showAlert} />} />
                <Route path="/famousfolktales" element={<FamousFolktails showAlert={showAlert} />} />
                <Route path="/contactus" element={<ContactUs showAlert={showAlert} />} />
                <Route path="/login" element={<Login showAlert={showAlert} />} />
                <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                <Route path="/savestories" element={<SaveStories showAlert={showAlert} />} />
                <Route path="/savestories/:id" element={<SingleStory showAlert={showAlert} />} />
                <Route path="/updatestories/:id" element={<SingleStory showAlert={showAlert} />} />
                <Route path="*" element={<NotFound showAlert={showAlert} />} />
              </Routes>
            </div>

          </BrowserRouter>
        </NoteState>
      </GoogleOAuthProvider>
      {/* </LoginSocialFacebook> */}
    </>
  );
}

export default App;
