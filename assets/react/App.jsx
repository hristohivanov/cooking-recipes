import React, {useContext, useEffect} from 'react';
import Index from './components/Index'
import LoginForm from "./components/LoginForm";
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./layouts/default/DefaultLayout";
import UserContext from './stores/user-context-provider';
import Recipe from "./components/recepies/Recipe";
import RegisterForm from "./components/RegisterForm";
import User from "./components/users/User";

const Home = function ({loggedUser}) {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        // Assuming you receive the value and want to set it on component mount
        setUser(loggedUser);
    }, [loggedUser, setUser]);

    return (
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<Index />}/>
                <Route path="/recipes/*" element={<Recipe />}/>
                <Route path="/login" element={<LoginForm />}/>
                <Route path="/register" element={<RegisterForm />}/>
                <Route path="/users/*" element={<User />}/>
            </Routes>
        </DefaultLayout>
    )
}

export default Home;
