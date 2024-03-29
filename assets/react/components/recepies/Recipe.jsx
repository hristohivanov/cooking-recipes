import React from 'react';
import {Route, Routes, useParams} from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeView from "./RecipeView";
import RecipeForm from "./RecipeForm";
import RecipeEdit from "./RecipeEdit";
import RecipeSearch from "./RecipeSearch";

const Recipe = () => {
    return (
        <Routes>
            <Route path="/" element={<RecipeList />}/>
            <Route path="/search/:searchedTitle" element={<RecipeSearch />}/>
            <Route path="/add" element={<RecipeForm />}/>
            <Route path="edit/:id" element={<RecipeEdit />}/>
            <Route path="/:id" element={<RecipeView />}/>
        </Routes>
    )
}

export default Recipe;