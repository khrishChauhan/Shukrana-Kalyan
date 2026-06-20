import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleLogout() {
    localStorage.removeItem('shukrana_admin_session');
    navigate('/admin');
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm">
      <div>
        <h1 className="text-base font-bold text-[#232F46] leading-tight">{t('sidebar.adminDashboard')}</h1>
        <p className="text-xs text-gray-400">{t('header.adminOverview')}</p>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-bold text-[#232F46]">Admin</span>
          <span className="text-xs text-gray-400">Shukrana Kalyan Sangh</span>
        </div>
        <Avatar initials="AD" size="md" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          leftIcon={<LogOut className="w-4 h-4" />}
          className="text-gray-500 hover:text-red-500 hidden sm:inline-flex"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
