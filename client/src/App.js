import React from 'react';
import AppRouter from './routes/app.router'
import Header from './Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <AppRouter/>
    </div>
  );
}

export default App;
