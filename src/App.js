import './App.css';
import AlertDismissible from './Components/Alert/Alert';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import MyNav from './Components/Nav/MyNav';
import { useSelector } from 'react-redux';
import './Components/SwitchBtn/SwitchBtn.css'
function App() {
  const theme = useSelector((state) => state.theme.value)
  return (
    <>
    <div className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
    <MyNav/>
    <AlertDismissible/>
    <Main/>
    <Footer/>
    </div>
    </>
  );
}

export default App;
