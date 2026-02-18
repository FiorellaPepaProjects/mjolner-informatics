import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import CharacterDetail from './pages/characterDetail/CharacterDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='character/:id' element={<CharacterDetail />} />

                    <Route path='*' element={<Navigate to='/' replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
