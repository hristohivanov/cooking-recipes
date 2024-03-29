import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import apiCall from "../../api/apiCall";
import {hydraResourceToRouteLink} from "../../helpers/defaultHelpers";
import UserContext from "../../stores/user-context-provider";

const RecipeForm = ({recipeId}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(recipeId !== undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (recipeId !== undefined) {
            fetchData(recipeId);
        }

    }, [recipeId]); // Fetch data when page changes

    const fetchData = async (id) => {
        try {
            const jsonData = await apiCall(`/api/recipes/${id}`);

            setTitle(jsonData.title);
            setContent(jsonData.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !content) {
            setError({message: 'All fields are required'});
        } else {
            try {
                const result = await apiCall(
                    `/api/recipes${recipeId ? `/${recipeId}` : ''}`,
                    {title, content},
                    recipeId !== undefined ? 'PATCH' : 'POST');
                setTitle('');
                setError('');

                navigate(hydraResourceToRouteLink(result['@id']));
            } catch (error) {
                console.log(error);
                setError(error);
                console.error(error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <h2>New Recipe</h2>
            {error.message && <p style={{color: 'red'}}>{error.message}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Post</Button>
            </Form>
        </div>
    );
}

export default RecipeForm;