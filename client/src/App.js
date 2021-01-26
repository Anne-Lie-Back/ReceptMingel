import React from 'react';
import AppRouter from './routes/app.router';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App" /* style = {{position: 'relative'}} */>
      <Header/>
      <AppRouter/>
      <Footer/>
    </div>
  );
};

export default App;
