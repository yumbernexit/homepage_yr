import * as React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import MajeekoUI from './routes/MajeekoUI';
import PaymentMajeeko from './components/Majeeko/Payments';
import HomeContainerUI from './routes/HomeUI';
import HomeUI from './components/Home/Home';

const App:React.FC = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContainerUI />} > 
            <Route path='/'  element={<HomeUI />} />
        </Route>
        <Route path="/majeeko" element={<MajeekoUI />}>
            <Route path='payment' element={<PaymentMajeeko />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
