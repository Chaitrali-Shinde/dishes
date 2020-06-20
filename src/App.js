import React from 'react';
import Main from './components/MainComponent'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

class App extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <div>
           <Main />
        </div>
        </BrowserRouter>
    );
  }
}
export default App;
