import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Welcome from './components/Welcome';
import ChatRoom from './components/Appointments';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">{user ? <ChatRoom /> : <Welcome />}</header>
    </div>
  );
}

export default App;
