import React from 'react';
import RecipeList from "./recepies/RecipeList";

const Index = () => {
    return(
        <>
            <h1 className={'heading-primary'}>See All We Have</h1>
            <RecipeList/>
        </>
    );
}

export default Index;