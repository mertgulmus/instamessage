import { PureComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Messages from "./routes/Messages";
import Contacts from "./routes/Contacts";
import Settings from "./routes/Settings/Settings";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import React from "react";

export class App extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Messages />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/chat/:id" element={<Messages />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
