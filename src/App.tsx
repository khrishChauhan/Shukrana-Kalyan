/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PaymentSubmissionPage from './pages/PaymentSubmissionPage';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './components/DashboardLayout';
import ComingSoonPage from './pages/ComingSoonPage';

// My Account pages
import ProfileSettings from './pages/account/ProfileSettings';
import ChangePassword from './pages/account/ChangePassword';
import MembershipCard from './pages/account/MembershipCard';
import WelcomeLetter from './pages/account/WelcomeLetter';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login & Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/payment-submission" element={<PaymentSubmissionPage />} />
        
        {/* Dashboard Layout wrapper */}
        <Route element={<DashboardLayout />}>
          {/* Main Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* ── MY ACCOUNT ── */}
          <Route path="/account/profile-settings" element={<ProfileSettings />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          <Route path="/account/membership-card" element={<MembershipCard />} />
          <Route path="/account/welcome-letter" element={<WelcomeLetter />} />

          {/* ── BHAVISHYA NIDHI ── */}
          <Route path="/bhavishya-nidhi/income" element={<ComingSoonPage />} />
          <Route path="/bhavishya-nidhi/activation" element={<ComingSoonPage />} />
          
          {/* ── DEPOSIT ── */}
          <Route path="/deposit/activate" element={<ComingSoonPage />} />
          <Route path="/deposit/member-donation-wallet" element={<ComingSoonPage />} />
          <Route path="/deposit/wallet-statement" element={<ComingSoonPage />} />
          <Route path="/deposit/request-donation" element={<ComingSoonPage />} />
          <Route path="/deposit/deposit-inr" element={<ComingSoonPage />} />
          
          {/* ── DISCOUNT CARD ── */}
          <Route path="/discount-card/view" element={<ComingSoonPage />} />
          <Route path="/discount-card/upgrade-deduction" element={<ComingSoonPage />} />
          <Route path="/discount-card/income" element={<ComingSoonPage />} />
          <Route path="/discount-card/buy" element={<ComingSoonPage />} />
          
          {/* ── DONATION ── */}
          <Route path="/donation/donate" element={<ComingSoonPage />} />
          <Route path="/donation/razorpay-history" element={<ComingSoonPage />} />
          <Route path="/donation/razorpay" element={<ComingSoonPage />} />
          <Route path="/donation/request" element={<ComingSoonPage />} />
          
          {/* ── INCOME ── */}
          <Route path="/income/level" element={<ComingSoonPage />} />
          <Route path="/income/matching" element={<ComingSoonPage />} />
          <Route path="/income/detail" element={<ComingSoonPage />} />
          <Route path="/income/running" element={<ComingSoonPage />} />
          <Route path="/income/statement" element={<ComingSoonPage />} />
          
          {/* ── JIVANDAAN SAMRIDDHI ── */}
          <Route path="/jivandaan/activate" element={<ComingSoonPage />} />
          <Route path="/jivandaan/activation" element={<ComingSoonPage />} />
          <Route path="/jivandaan/samriddhi" element={<ComingSoonPage />} />
          
          {/* ── MESSAGE ── */}
          <Route path="/message" element={<ComingSoonPage />} />
          
          {/* ── MY TEAM ── */}
          <Route path="/my-team/left-downline" element={<ComingSoonPage />} />
          <Route path="/my-team/left-downline-paid" element={<ComingSoonPage />} />
          <Route path="/my-team/level-wise" element={<ComingSoonPage />} />
          <Route path="/my-team/tree-view" element={<ComingSoonPage />} />
          <Route path="/my-team/right-downline" element={<ComingSoonPage />} />
          <Route path="/my-team/right-downline-paid" element={<ComingSoonPage />} />
          <Route path="/my-team/direct-member" element={<ComingSoonPage />} />
          
          {/* ── ONLINE PAYMENT ── */}
          <Route path="/online-payment" element={<ComingSoonPage />} />
          
          {/* ── PAYMENT ── */}
          <Route path="/payment/transaction" element={<ComingSoonPage />} />
          <Route path="/payment/income-to-activation" element={<ComingSoonPage />} />
          
          {/* ── PROJECT FUND ── */}
          <Route path="/project-fund/request-grantee" element={<ComingSoonPage />} />
          <Route path="/project-fund/status" element={<ComingSoonPage />} />
          <Route path="/project-fund/my-fund" element={<ComingSoonPage />} />
          <Route path="/project-fund/verification" element={<ComingSoonPage />} />
          <Route path="/project-fund/repayment" element={<ComingSoonPage />} />
          <Route path="/project-fund/p2p" element={<ComingSoonPage />} />
          <Route path="/project-fund/income-to-fund" element={<ComingSoonPage />} />
          
          {/* ── SUPPORT ── */}
          <Route path="/support/complaint" element={<ComingSoonPage />} />
          <Route path="/support/suggestion" element={<ComingSoonPage />} />
          <Route path="/support/seminar-meeting" element={<ComingSoonPage />} />
          
          {/* ── WITHDRAW ── */}
          <Route path="/withdraw/request" element={<ComingSoonPage />} />
          
          {/* ── SETTINGS ── */}
          <Route path="/settings/general" element={<ComingSoonPage />} />
          <Route path="/settings/profile" element={<ComingSoonPage />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
