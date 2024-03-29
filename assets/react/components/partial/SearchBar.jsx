import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const SearchBar = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (value.length > 0) {
            navigate(`/recipes/search/${value}`)
        }
    };

    return (
        <Form onSubmit={handleSearch}>
            <Row>
                <Col xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                        value={value}
                        maxLength={30}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Col>
                <Col xs="auto">
                    <Button onClick={handleSearch}>Find</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBar;