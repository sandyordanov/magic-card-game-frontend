import React from "react";
import UpdateCardForm from "../../Components/UpdateCardForm";
import { useLocation } from 'react-router-dom';
const UpdatePage = () => {
    const location = useLocation();
    const  selectedCard = location.state || {};
    return(
        <>
        <UpdateCardForm selectedCard={selectedCard}/>
        </>
    )
}
export default UpdatePage;