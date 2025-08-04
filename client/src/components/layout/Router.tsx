import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from '../../pages/Home';
export default function Router() {
    const Layout = () => {
        return (
            <>
            <div><Outlet /></div>
            </>
        )
    }
    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                </Routes>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRoutes />
    )
}