import logo from './logo.svg';
import './App.css';
import React from 'react'
import { TestComponent } from './components';
// import { FormComponent } from './components/form-component/form-component';
import { PostFormComponent } from './components/components/postform-component';

function App() {
  return (
    <div style={{backgroundImage: "url(/nokia_espoo_campus.jpg)", 
    backgroundRepeat:"no-repeat", 
    backgroundSize:"cover",
    height:'110vh',
    paddingTop: '50px',
    }}>
      <TestComponent />
      <PostFormComponent />
    </div>
  );
}

export default App;
