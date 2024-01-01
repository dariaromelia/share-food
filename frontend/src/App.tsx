import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Login from './pages/Login';
import { User } from './types/User';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import AlertBar from './components/AlertBar';

function App() {

  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="App">
      {
        user ? <>
          <Navbar user={user} />
          <AlertBar user={user} />
          <Routes>
            {
              routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.page user={user} />} />
              ))
            }
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </> : <>
          
          <Routes>
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register setUser={setUser} />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
