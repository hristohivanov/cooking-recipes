import React, {useContext, useEffect, useState} from 'react';
import apiCall from "../../api/apiCall";
import {Button} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {hydraResourceToRouteLink} from "../../helpers/defaultHelpers";
import UserContext from "../../stores/user-context-provider";

const RecipeView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        fetchData(id);
    }, [id]); // Fetch data when page changes

    const fetchData = async (id) => {
        try {
            const jsonData = await apiCall(`/api/recipes/${id}`);

            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            try {
                await apiCall(`/api/recipes/${id}`, {}, 'DELETE')
                navigate('/');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    }

    return (
        <div className="content">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {'/api/users/' + user.id === data.owner && (
                        <>
                            <Button variant="primary" as={Link} to={`/recipes/edit/${data.id}`}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(data.id)}>
                                Delete
                            </Button>
                        </>
                    )}

                    <h2 className="heading-primary">{data.title}</h2>
                    <p style={{textAlign: "right"}}>Published By: <b><Link to={hydraResourceToRouteLink(data.owner)}>{data.ownerUsername}</Link></b> at <b>{data.publishedAtFormatted}</b></p>
                    <p>
                        <img src={'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e856355a9%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e856355a9%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'}
                             alt={''}
                             className={'head-image'}
                        />
                        {data.content}
                    </p>
                </>

            )}
        </div>
    );
}

export default RecipeView;