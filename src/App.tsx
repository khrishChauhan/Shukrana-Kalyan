/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// ── PUBLIC ───────────────────────────────────────────────────────────────────
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PaymentSubmissionPage from './pages/PaymentSubmissionPage';

// ── MEMBER PORTAL ────────────────────────────────────────────────────────────
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './components/DashboardLayout';

import ProfileSettings from './pages/account/ProfileSettings';
import ChangePassword from './pages/account/ChangePassword';
import MembershipCard from './pages/account/MembershipCard';
import WelcomeLetter from './pages/account/WelcomeLetter';
import ConsentLetterPage from './pages/account/ConsentLetterPage';
import MembershipStatus from './pages/account/MembershipStatus';
import KYCVerification from './pages/account/KYCVerification';
import ActivityTimelinePage from './pages/account/ActivityTimelinePage';

import NetworkOverviewPage from './pages/network/NetworkOverviewPage';
import DirectReferralsPage from './pages/network/DirectReferralsPage';
import VerifiedMembersPage from './pages/network/VerifiedMembersPage';
import PendingApprovalPage from './pages/network/PendingApprovalPage';
import NetworkLevelsPage from './pages/network/NetworkLevelsPage';
import NetworkTreePage from './pages/network/NetworkTreePage';

import NotificationsPage from './pages/NotificationsPage';

// ── ADMIN ────────────────────────────────────────────────────────────────────
import AdminLayout from './components/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/payment-submission" element={<PaymentSubmissionPage />} />

          {/* ADMIN — isolated from DashboardLayout */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard"      element={<AdminDashboardPage />} />
            <Route path="/admin/members"        element={<AdminMembersPage />} />
            <Route path="/admin/notifications"  element={<AdminNotificationsPage />} />
          </Route>

          {/* MEMBER PORTAL */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* My Account — cleaned per Phase F/G */}
            <Route path="/account/activity-timeline" element={<ActivityTimelinePage />} />
            <Route path="/account/profile-settings"  element={<ProfileSettings />} />
            <Route path="/account/membership-status" element={<MembershipStatus />} />
            <Route path="/account/membership-card"   element={<MembershipCard />} />
            <Route path="/account/welcome-letter"    element={<WelcomeLetter />} />
            <Route path="/account/consent-letter"    element={<ConsentLetterPage />} />
            <Route path="/account/change-password"   element={<ChangePassword />} />
            <Route path="/account/kyc-verification"  element={<KYCVerification />} />

            {/* Member Network — all 6 kept */}
            <Route path="/network/overview"         element={<NetworkOverviewPage />} />
            <Route path="/network/direct-referrals" element={<DirectReferralsPage />} />
            <Route path="/network/verified-members" element={<VerifiedMembersPage />} />
            <Route path="/network/pending-approval" element={<PendingApprovalPage />} />
            <Route path="/network/network-levels"   element={<NetworkLevelsPage />} />
            <Route path="/network/network-tree"     element={<NetworkTreePage />} />

            {/* Notifications */}
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
