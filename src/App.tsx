import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hormones from './hormones';
import Main from './pages/main';
import P5sketch from './sketch';

function App() {
  return (
    <>  
      {/* Routes */}
      <Routes>
        <Route path='/' element={<P5sketch />}>
          <Route index element={<Main/>} />
          <Route path=':hormoneName' element={<Hormones/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
