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
import KycCenterPage from './pages/account/KycCenterPage';
import BankDetailsPage from './pages/account/BankDetailsPage';
import ActivityTimelinePage from './pages/account/ActivityTimelinePage';

import NetworkOverviewPage from './pages/network/NetworkOverviewPage';
import DirectReferralsPage from './pages/network/DirectReferralsPage';
import VerifiedMembersPage from './pages/network/VerifiedMembersPage';
import PendingApprovalPage from './pages/network/PendingApprovalPage';
import NetworkLevelsPage from './pages/network/NetworkLevelsPage';
import NetworkTreePage from './pages/network/NetworkTreePage';

import NotificationsPage from './pages/NotificationsPage';

// ── BUSINESS ─────────────────────────────────────────────────────────────────
import BusinessDashboardPage from './pages/business/BusinessDashboardPage';
import BusinessProfilePage from './pages/business/BusinessProfilePage';
import SponsorTreePage from './pages/business/SponsorTreePage';
import PlacementTreePage from './pages/business/PlacementTreePage';
import BusinessCalculatorPage from './pages/business/BusinessCalculatorPage';
import IncomeDashboardPage from './pages/business/IncomeDashboardPage';
import SponsorIncomePage from './pages/business/SponsorIncomePage';
import MatchingIncomePage from './pages/business/MatchingIncomePage';
import LevelIncomePage from './pages/business/LevelIncomePage';
import RoyaltyIncomePage from './pages/business/RoyaltyIncomePage';
import IncomeLedgerPage from './pages/business/IncomeLedgerPage';
import IncomeBreakdownPage from './pages/business/IncomeBreakdownPage';
import BvDashboardPage from './pages/business/BvDashboardPage';
import PairMatchingPage from './pages/business/PairMatchingPage';
import ReportsPage from './pages/business/ReportsPage';
import DownloadsPage from './pages/business/DownloadsPage';
import BusinessTimelinePage from './pages/business/BusinessTimelinePage';
import PayoutHistoryPage from './pages/business/PayoutHistoryPage';
import WalletCenterPage from './pages/business/WalletCenterPage';
import WalletLedgerPage from './pages/business/WalletLedgerPage';
import WithdrawalCenterPage from './pages/business/WithdrawalCenterPage';
import PaymentCenterPage from './pages/business/PaymentCenterPage';

// ── ADMIN ────────────────────────────────────────────────────────────────────
import AdminLayout from './components/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminBusinessSettingsPage from './pages/admin/AdminBusinessSettingsPage';
import AdminPayoutManagementPage from './pages/admin/AdminPayoutManagementPage';
import AdminBusinessRulesPage from './pages/admin/AdminBusinessRulesPage';
import AdminBusinessKYCPage from './pages/admin/AdminBusinessKYCPage';
import AdminGlobalSponsorTreePage from './pages/admin/AdminGlobalSponsorTreePage';
import AdminGlobalPlacementTreePage from './pages/admin/AdminGlobalPlacementTreePage';
import AdminTreeOverridesPage from './pages/admin/AdminTreeOverridesPage';

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
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/members" element={<AdminMembersPage />} />
            
            {/* Admin Business Ops */}
            <Route path="/admin/business/settings" element={<AdminBusinessSettingsPage />} />
            <Route path="/admin/business/payouts" element={<AdminPayoutManagementPage />} />
            <Route path="/admin/business/rules" element={<AdminBusinessRulesPage />} />
            <Route path="/admin/business/kyc" element={<AdminBusinessKYCPage />} />
            <Route path="/admin/business/global-sponsor-tree" element={<AdminGlobalSponsorTreePage />} />
            <Route path="/admin/business/global-placement-tree" element={<AdminGlobalPlacementTreePage />} />
            <Route path="/admin/business/tree-overrides" element={<AdminTreeOverridesPage />} />
            
            <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
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
            <Route path="/account/kyc"               element={<KycCenterPage />} />
            <Route path="/account/bank-details"      element={<BankDetailsPage />} />
            <Route path="/payments"                  element={<PaymentCenterPage />} />

            {/* Member Network — all 6 kept */}
            <Route path="/network/overview"         element={<NetworkOverviewPage />} />
            <Route path="/network/direct-referrals" element={<DirectReferralsPage />} />
            <Route path="/network/verified-members" element={<VerifiedMembersPage />} />
            <Route path="/network/pending-approval" element={<PendingApprovalPage />} />
            <Route path="/network/network-levels"   element={<NetworkLevelsPage />} />
            <Route path="/network/network-tree"     element={<NetworkTreePage />} />

            {/* Business */}
            <Route path="/business/dashboard"       element={<BusinessDashboardPage />} />
            <Route path="/business/profile"         element={<BusinessProfilePage />} />
            <Route path="/business/sponsor-tree"    element={<SponsorTreePage />} />
            <Route path="/business/placement-tree"  element={<PlacementTreePage />} />
            <Route path="/business/calculator"      element={<BusinessCalculatorPage />} />
            <Route path="/business/income-dashboard" element={<IncomeDashboardPage />} />
            <Route path="/business/sponsor-income"  element={<SponsorIncomePage />} />
            <Route path="/business/matching-income" element={<MatchingIncomePage />} />
            <Route path="/business/level-income"    element={<LevelIncomePage />} />
            <Route path="/business/royalty-income"  element={<RoyaltyIncomePage />} />
            <Route path="/business/income-ledger"   element={<IncomeLedgerPage />} />
            <Route path="/business/income-breakdown" element={<IncomeBreakdownPage />} />
            <Route path="/business/bv-dashboard"    element={<BvDashboardPage />} />
            <Route path="/business/pair-matching"   element={<PairMatchingPage />} />
            <Route path="/business/reports"         element={<ReportsPage />} />
            <Route path="/business/downloads"       element={<DownloadsPage />} />
            <Route path="/business/timeline"        element={<BusinessTimelinePage />} />
            <Route path="/business/payout-history"  element={<PayoutHistoryPage />} />
            <Route path="/wallet"                   element={<WalletCenterPage />} />
            <Route path="/wallet/ledger"            element={<WalletLedgerPage />} />
            <Route path="/wallet/withdrawals"       element={<WithdrawalCenterPage />} />
            <Route path="/wallet/payout-history"    element={<PayoutHistoryPage />} />

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
