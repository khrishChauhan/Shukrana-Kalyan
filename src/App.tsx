/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './components/DashboardLayout';
import ComingSoonPage from './pages/ComingSoonPage';
import EditProfile from './pages/account/EditProfile';
import IDCard from './pages/account/IDCard';
import UploadKYC from './pages/account/UploadKYC';
import TransactionPassword from './pages/account/TransactionPassword';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Login Credentials validation segment */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Real-time Administration Core & Parent layout */}
        <Route element={<DashboardLayout />}>
          {/* Main Dashboard view */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Account submenus */}
          <Route path="/account/activity-tracker" element={<ComingSoonPage />} />
          <Route path="/account/kyc-verification" element={<ComingSoonPage />} />
          <Route path="/account/change-password" element={<ComingSoonPage />} />
          <Route path="/account/consent-letter" element={<ComingSoonPage />} />
          <Route path="/account/welcome-letter" element={<ComingSoonPage />} />
          <Route path="/account/edit-profile" element={<EditProfile />} />
          <Route path="/account/id-card" element={<IDCard />} />
          <Route path="/account/upload-kyc" element={<UploadKYC />} />
          <Route path="/account/transaction-password" element={<TransactionPassword />} />
          
          {/* Bhavishya Nidhi submenus */}
          <Route path="/bhavishya-nidhi/income" element={<ComingSoonPage />} />
          <Route path="/bhavishya-nidhi/activation" element={<ComingSoonPage />} />
          
          {/* Deposit submenus */}
          <Route path="/deposit/activate" element={<ComingSoonPage />} />
          <Route path="/deposit/member-donation-wallet" element={<ComingSoonPage />} />
          <Route path="/deposit/wallet-statement" element={<ComingSoonPage />} />
          <Route path="/deposit/request-donation" element={<ComingSoonPage />} />
          <Route path="/deposit/deposit-inr" element={<ComingSoonPage />} />
          
          {/* Discount Card submenus */}
          <Route path="/discount-card/view" element={<ComingSoonPage />} />
          <Route path="/discount-card/upgrade-deduction" element={<ComingSoonPage />} />
          <Route path="/discount-card/income" element={<ComingSoonPage />} />
          <Route path="/discount-card/buy" element={<ComingSoonPage />} />
          
          {/* Donation submenus */}
          <Route path="/donation/donate" element={<ComingSoonPage />} />
          <Route path="/donation/razorpay-history" element={<ComingSoonPage />} />
          <Route path="/donation/razorpay" element={<ComingSoonPage />} />
          <Route path="/donation/request" element={<ComingSoonPage />} />
          
          {/* Income submenus */}
          <Route path="/income/level" element={<ComingSoonPage />} />
          <Route path="/income/matching" element={<ComingSoonPage />} />
          <Route path="/income/detail" element={<ComingSoonPage />} />
          <Route path="/income/running" element={<ComingSoonPage />} />
          <Route path="/income/statement" element={<ComingSoonPage />} />
          
          {/* Jivandaan Samriddhi submenus */}
          <Route path="/jivandaan/activate" element={<ComingSoonPage />} />
          <Route path="/jivandaan/activation" element={<ComingSoonPage />} />
          <Route path="/jivandaan/samriddhi" element={<ComingSoonPage />} />
          
          {/* Message submenus */}
          <Route path="/message" element={<ComingSoonPage />} />
          
          {/* My Team submenus */}
          <Route path="/my-team/left-downline" element={<ComingSoonPage />} />
          <Route path="/my-team/left-downline-paid" element={<ComingSoonPage />} />
          <Route path="/my-team/level-wise" element={<ComingSoonPage />} />
          <Route path="/my-team/tree-view" element={<ComingSoonPage />} />
          <Route path="/my-team/right-downline" element={<ComingSoonPage />} />
          <Route path="/my-team/right-downline-paid" element={<ComingSoonPage />} />
          <Route path="/my-team/direct-member" element={<ComingSoonPage />} />
          
          {/* Online Payment parent menu (directly linked, no submenus) */}
          <Route path="/online-payment" element={<ComingSoonPage />} />
          
          {/* Payment submenus */}
          <Route path="/payment/transaction" element={<ComingSoonPage />} />
          <Route path="/payment/income-to-activation" element={<ComingSoonPage />} />
          
          {/* Project Fund submenus */}
          <Route path="/project-fund/request-grantee" element={<ComingSoonPage />} />
          <Route path="/project-fund/status" element={<ComingSoonPage />} />
          <Route path="/project-fund/my-fund" element={<ComingSoonPage />} />
          <Route path="/project-fund/verification" element={<ComingSoonPage />} />
          <Route path="/project-fund/repayment" element={<ComingSoonPage />} />
          <Route path="/project-fund/p2p" element={<ComingSoonPage />} />
          <Route path="/project-fund/income-to-fund" element={<ComingSoonPage />} />
          
          {/* Support submenus */}
          <Route path="/support/complaint" element={<ComingSoonPage />} />
          <Route path="/support/suggestion" element={<ComingSoonPage />} />
          <Route path="/support/seminar-meeting" element={<ComingSoonPage />} />
          
          {/* Withdraw submenus */}
          <Route path="/withdraw/request" element={<ComingSoonPage />} />
          
          {/* Settings submenus */}
          <Route path="/settings/general" element={<ComingSoonPage />} />
          <Route path="/settings/profile" element={<ComingSoonPage />} />
        </Route>
        
        {/* Fallback route - safely redirects to central landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
