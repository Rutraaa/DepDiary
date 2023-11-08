import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from './Components/Login_Auth/Login/LoginPage';
import { Registration } from './Components/Login_Auth/Registration/Registration';
import { NotFoundPage } from './Components/Login_Auth/NotFoundPage';

export const RouterConfig = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router >
        </>
    );
}