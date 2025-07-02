import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Container from '../Layouts/Container'
import Breadcrumbs from './Breadcrumbs';

// DashboardLayout is the main layout for admin area
// It contains a persistent sidebar and a dynamic content area
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
                    <div className="flex">
                        <AdminSidebar />
                        <div className="flex-1 p-6 bg-gray-100">
                            <Outlet />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
export default DashboardLayout;