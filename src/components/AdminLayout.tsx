import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const navigate = useNavigate();

  // Guard: redirect if no admin session
  const session = localStorage.getItem('shukrana_admin_session');
  if (!session) {
    navigate('/admin', { replace: true });
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
