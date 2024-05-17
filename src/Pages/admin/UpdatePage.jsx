import React from "react";
import UpdateCardForm from "../../Components/UpdateCardForm";
import { useLocation } from 'react-router-dom';
const UpdatePage = () => {
    const location = useLocation();
    const  selectedCard = location.state || {};
    return(
        <>
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-6">
                            <UpdateCardForm selectedCard={selectedCard}/>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default UpdatePage;