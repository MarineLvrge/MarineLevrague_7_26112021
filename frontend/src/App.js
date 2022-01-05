import Routes from './components/Routes'
import home from './pages/home';



const App = () => {


  return (
    <div className='App'>
      <Routes exact path='/' component={home} />
    </div>
  );
};

export default App;
