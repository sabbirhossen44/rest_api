import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Container from '../Layouts/Container'
import Breadcrumbs from './Breadcrumbs';


const DashboardLayout = () => {
    return (
        <>
            <div className="py-20">
                <Container>
                    <div className="pb-10">
                        <Breadcrumbs 
                            title='Dashboard'
                            link = '/admin/dashboard'
                        />
                    </div>
                    <div className="flex rounded-lg overflow-hidden md:flex-row flex-col">
                        <AdminSidebar />
                        <div className="flex-1 md:p-6 p-1 bg-gray-100">
                            <Outlet />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
export default DashboardLayout;