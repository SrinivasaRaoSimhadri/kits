import {BrowserRouter, Route, Routes} from "react-router-dom";
import VoterId from "./utils/VoterId";
import Authenticate from "./utils/Authenticate";
import Vote from "./utils/Vote";
const App = () => {
    return (
      <BrowserRouter>
          <Routes>
              <Route path = "/" element={<VoterId/>}/>
              <Route path = "/authenticate" element={<Authenticate/>}/>
              <Route path = "/vote" element={<Vote/>}/>
          </Routes>
      </BrowserRouter>
    )
}
export default App;