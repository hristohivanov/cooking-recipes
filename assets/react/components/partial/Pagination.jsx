import React from "react";
import {Button} from "react-bootstrap";

const Pagination = ({page, totalPages, handlePrevPage, handleNextPage}) => {
    if (totalPages <= 1) {
        return null;
    }
    return (
        <div className="pagination">
            <Button variant="primary" onClick={handlePrevPage} disabled={page === 1}>
                Previous
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button variant="primary" onClick={handleNextPage} disabled={page >= totalPages}>
                Next
            </Button>
        </div>
    )
}

export default Pagination;