import React from "react";
import UpdateCardForm from "../../Components/UpdateCardForm";
import { useLocation } from 'react-router-dom';
import NavAdmin from "../../Components/NavAdmin.jsx";
import CreateAdminForm from "../../Components/CreateAdminForm.jsx";
const AdminsPage = () => {
    const location = useLocation();
    const  selectedCard = location.state || {};
    return(
        <>
            <div className="page-container">

                <div className="row">
                    <div className="col-2 bg-dark nav-admin-container">
                        <NavAdmin class=""/>
                    </div>
                    <div className="col-6">
                        <CreateAdminForm/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminsPage;