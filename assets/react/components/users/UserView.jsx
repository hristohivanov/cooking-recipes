import React, {useContext, useEffect, useState} from 'react';
import RecipeList from "../recepies/RecipeList";
import {useNavigate, useParams} from "react-router-dom";
import UserContext from "../../stores/user-context-provider";
import apiCall from "../../api/apiCall";

const UserView = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    useEffect(() => {

        fetchData(id);
    }, [id]); // Fetch data when page changes

    const fetchData = async (id) => {
        try {
            const jsonData = await apiCall(`/api/users/${id}`);

            setUser(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={'content'}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <p>Username: <b>{user.username}</b></p>
                        <p>Email: <b>{user.email}</b></p>
                    </>
                )}
            </div>

            <RecipeList ownerId={id}/>
        </>
    )
}

export default UserView;