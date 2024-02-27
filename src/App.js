import './App.css';
import Main from './Components/Main/Main';
import Error from './Components/ErrorPage/Error';
import Details from './Components/Details/Details';
import { useSelector } from 'react-redux';
import './Components/SwitchBtn/SwitchBtn.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const theme = useSelector((state) => state.theme.value)
  return (
    <>
    <BrowserRouter>
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
    <Routes>
    <Route exact path= '/' element = {<Main />} />
    <Route path = '/book/:asin' element={<Details />} />
    <Route path='*' element = {<Error />} />
    </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
