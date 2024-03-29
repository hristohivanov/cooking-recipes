import React, {useState, useEffect} from 'react';
import Pagination from "../partial/Pagination";
import RecipeCard from "./RecipeCard";
import {Row} from "react-bootstrap";
import apiCall from "../../api/apiCall";

const RecipeList = ({ownerId, searchedTitle}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchData();
    }, [page]); // Fetch data when page changes

    const fetchData = async () => {
        const filters = {
            page:page,
        }

        if (ownerId) {
            filters.owner = ownerId;
        }

        if (searchedTitle) {
            filters.title = searchedTitle;
        }
        try {
            const jsonData = await apiCall(`/api/recipes`, filters);

            setData(jsonData['hydra:member']);
            if (jsonData['hydra:view']['hydra:last']) {
                setTotalPages(jsonData['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]);
            } else {
                setTotalPages(1);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="title">{searchedTitle ? `Results For: "${searchedTitle}"` : `Cooking Recipes`}</h2>
            <div className="recipe-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <Row xs="auto">
                            {data.map((item) => (
                                <RecipeCard
                                    key={item.id}
                                    {...item}
                                >
                                    {item.shortContent}
                                </RecipeCard>
                            ))}
                        </Row>
                        <Pagination
                            {...{totalPages, page}}
                            handlePrevPage={() => {
                                setPage(page - 1);
                            }}

                            handleNextPage={() => {
                                setPage(page + 1)
                            }}
                        />
                    </>
                )}

            </div>
        </div>
    );
};

export default RecipeList;