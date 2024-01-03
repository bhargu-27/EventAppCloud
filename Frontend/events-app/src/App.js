import { Route,Routes } from 'react-router-dom';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import CreateEvent from './Components/CreateEvent';
import EventPage from './Components/EventPage';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login'element={<LogIn/>}/>
        <Route path='/signup'element={<SignUp/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/event/create' element={<CreateEvent/>}/>
        <Route path='/event/:eventId' element={<EventPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
