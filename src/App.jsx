import './App.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import LoginCard from "@/pages/LoginCard.jsx";
import SignUp from "@/pages/SignUp.jsx";
import ImageGallary from "@/pages/ImageGallary.jsx";
import ImageUpload from "@/pages/ImageUpload.jsx";
import ImageConvert from "@/pages/ImageConvert.jsx";
import {createContext, useState} from "react";

export const UserSessionContext = createContext();

function App() {
    const [jwtToken, setJwtToken] = useState("");
    const [userId, setUserId] = useState("");
    return (
        <UserSessionContext.Provider value={{jwtToken, setJwtToken, userId, setUserId}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<SignUp/>}/>

                    <Route path="/" element={<LoginCard/>}/>
                    <Route path="/gallery" element={<ImageGallary/>}/>
                    <Route path="/upload" element={<ImageUpload/>}/>
                    <Route path="/convert" element={<ImageConvert/>}/>
                </Routes>
            </BrowserRouter>
        </UserSessionContext.Provider>
    )
}

export default App
