import { Route, Routes } from 'react-router-dom';
import './App.css'
import NameSelectorPage from './pages/name_selection'
import LetterDisplayPage from './pages/letter_display';



function App() {
  return (
    <Routes>
      <Route path="/" element={<NameSelectorPage />} />
      <Route path="/letter" element={<LetterDisplayPage/>}/>
    </Routes>
  );
}


export default App
