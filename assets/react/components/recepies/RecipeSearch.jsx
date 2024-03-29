import React from 'react';
import {useParams} from "react-router-dom";
import RecipeList from "./RecipeList";

const RecipeSearch = () => {
    const {searchedTitle} = useParams();
    return <RecipeList searchedTitle={searchedTitle} key={searchedTitle} />
}

export default RecipeSearch;