import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import RecipeForm from "./RecipeForm";

const RecipeEdit = () => {
    const { id } = useParams();

    return (
        <RecipeForm recipeId={id} />
    )
}

export default RecipeEdit;