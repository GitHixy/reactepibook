import './App.css';
import AlertDismissible from './Components/Alert/Alert';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import MyNav from './Components/Nav/MyNav';

function App() {
  return (
    <>
    <MyNav/>
    <AlertDismissible/>
    <Main/>
    <Footer/>
    </>
  );
}

export default App;
