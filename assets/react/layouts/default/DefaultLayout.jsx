import Container from 'react-bootstrap/Container';
import React, {useContext, useEffect} from "react";
import Header from "./Header";
import UserContext from "../../stores/user-context-provider";

const DefaultLayout = ({children, loggedUser}) => {
        return (
        <>
            <Header/>
            <Container className={'wrapper'}>
                {children}
            </Container>
        </>

    )
}

export default DefaultLayout;