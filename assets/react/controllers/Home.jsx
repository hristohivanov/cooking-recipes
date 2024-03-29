import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {UserContextProvider} from '../stores/user-context-provider';
import App from "../App";

const Home = function ({loggedUser}) {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <UserContextProvider>
                    <App loggedUser={loggedUser}/>
                </UserContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default Home;
