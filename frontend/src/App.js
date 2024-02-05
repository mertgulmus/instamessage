import { PureComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Messages from "./routes/Messages/Messages";
import Contacts from "./routes/Contacts/Contacts";
import Settings from "./routes/Settings/Settings";
import Login from "./routes/Login/Login";

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
            </Routes>
        </BrowserRouter>
        );
    }
};

export default App;
