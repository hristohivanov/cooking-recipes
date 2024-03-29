import React from 'react';
import {Route, Routes} from "react-router-dom";
import UserView from "./UserView";

const User = () => {
    return (
        <Routes>
            <Route path="/:id" element={<UserView />}/>
        </Routes>
    )
}

export default User;