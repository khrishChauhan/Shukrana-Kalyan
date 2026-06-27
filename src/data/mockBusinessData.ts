export const mockBusinessProfile = {
  memberId: 'SK000123',
  sponsorId: 'SK000001',
  placementId: 'SK000050',
  placementParentName: 'Rajesh Kumar',
  activationDate: 'Oct 15, 2023',
  joinDate: 'Oct 10, 2023',
  rank: 'Silver Director',
  membershipStatus: 'Active',
  leftBv: 12500,
  rightBv: 8400,
  totalDirectMembers: 12,
  totalTeamMembers: 340,
};

export const mockBusinessHealth = {
  todayBusiness: 1200,
  currentBv: 20900,
  businessGrowth: '+15%',
  currentRank: 'Silver Director',
  royaltyEligibility: 'Eligible (Silver)',
  recentActivity: [
    { id: '1', date: '2023-10-18', event: 'New Direct Sponsored', details: 'Sneha Patel joined' },
    { id: '2', date: '2023-10-17', event: 'Matching Generated', details: '1000 BV Matched' },
    { id: '3', date: '2023-10-16', event: 'Rank Achieved', details: 'Promoted to Silver Director' }
  ],
  snapshot: {
    totalEarnings: 45000,
    todayEarnings: 1500,
    pendingPayout: 3200,
    totalWithdrawn: 41800,
  }
};

export const mockSponsorTree = {
  id: 'SK000123',
  name: 'Demo User',
  level: 0,
  children: [
    { id: 'SK000124', name: 'Sneha Patel', rank: 'Distributor', active: true, joinDate: 'Oct 18, 2023', level: 1, teamSize: 5 },
    { id: 'SK000125', name: 'Vikram Singh', rank: 'Silver Director', active: true, joinDate: 'Oct 19, 2023', level: 1, teamSize: 120 },
    { id: 'SK000126', name: 'Amit Kumar', rank: 'Distributor', active: false, joinDate: 'Oct 20, 2023', level: 1, teamSize: 0 },
  ]
};

export const mockPlacementTree = {
  id: 'SK000123',
  name: 'Demo User',
  rank: 'Silver Director',
  leftBv: 12500,
  rightBv: 8400,
  left: {
    id: 'SK000125',
    name: 'Vikram Singh',
    rank: 'Silver Director',
    leftBv: 6000,
    rightBv: 5000,
    left: null,
    right: {
      id: 'SK000128',
      name: 'Ravi Verma',
      rank: 'Distributor',
      leftBv: 0,
      rightBv: 0,
    }
  },
  right: {
    id: 'SK000124',
    name: 'Sneha Patel',
    rank: 'Distributor',
    leftBv: 500,
    rightBv: 200,
    left: null,
    right: null
  }
};

export const mockIncomeDashboard = {
  totalIncome: 125000,
  sponsorIncome: 15000,
  matchingIncome: 85000,
  levelIncome: 12000,
  royaltyIncome: 13000,
  ledger: [
    { id: 'TXN001', date: '2023-10-25', type: 'Credit', category: 'Binary Income', amount: 1500, balance: 45000 },
    { id: 'TXN002', date: '2023-10-24', type: 'Debit', category: 'Payout Withdrawal', amount: 5000, balance: 43500 },
    { id: 'TXN003', date: '2023-10-23', type: 'Credit', category: 'Sponsor Income', amount: 500, balance: 48500 },
  ],
  breakdown: [
    { period: 'October 2023', gross: 25000, tds: 1250, admin: 1250, donation: 500, net: 22000 },
    { period: 'September 2023', gross: 22000, tds: 1100, admin: 1100, donation: 500, net: 19300 },
  ]
};

export const mockBvDashboard = {
  totalLeftBv: 12500,
  totalRightBv: 8400,
  todayLeftBv: 1200,
  todayRightBv: 500,
  matchedBv: 15000,
  history: [
    { date: '2023-10-25', left: 500, right: 200, matched: 200, carriedForward: 'Left (300)' },
    { date: '2023-10-24', left: 0, right: 1000, matched: 0, carriedForward: 'Right (1000)' },
    { date: '2023-10-23', left: 1000, right: 1000, matched: 1000, carriedForward: 'None' },
  ]
};

export const mockPayoutHistory = [
  { id: 'PAY-101', date: '2023-10-25', gross: 25000, net: 22000, status: 'Paid', utr: 'UTR9876543210' },
  { id: 'PAY-100', date: '2023-09-25', gross: 22000, net: 19300, status: 'Paid', utr: 'UTR1234567890' },
  { id: 'PAY-099', date: '2023-08-25', gross: 15000, net: 13000, status: 'Processing', utr: null },
];

export const mockDownloads = [
  { id: '1', title: 'Business Brochure', type: 'PDF', size: '2.5 MB' },
  { id: '2', title: 'Marketing Kit', type: 'ZIP', size: '15.2 MB' },
  { id: '3', title: 'Income Statement (Oct)', type: 'PDF', size: '125 KB' },
];

export const mockWalletData = {
  availableBalance: 45000,
  lifetimeEarnings: 125000,
  todayEarnings: 1500,
  pendingWithdrawal: 10000,
  lifetimeWithdrawals: 70000,
  donationContribution: 2500,
  binaryIncome: 85000,
  sponsorIncome: 15000,
  levelIncome: 12000,
  royaltyIncome: 13000,
  recentCredits: [
    { id: 'CR-101', date: '2023-10-25', source: 'Binary Income', amount: 1500 },
    { id: 'CR-102', date: '2023-10-24', source: 'Sponsor Income', amount: 500 },
  ],
  recentDebits: [
    { id: 'DR-201', date: '2023-10-20', source: 'Payout Withdrawal', amount: 5000 },
  ],
  ledger: [
    { id: 'TXN-001', date: '2023-10-25', ref: 'BIN-901', type: 'Binary Income', credit: 1500, debit: 0, balance: 45000, remarks: 'Matches: 4', status: 'Completed' },
    { id: 'TXN-002', date: '2023-10-24', ref: 'SPO-801', type: 'Sponsor Income', credit: 500, debit: 0, balance: 43500, remarks: 'Sponsor SKS1005', status: 'Completed' },
    { id: 'TXN-003', date: '2023-10-20', ref: 'WD-701', type: 'Withdrawal', credit: 0, debit: 5000, balance: 43000, remarks: 'Bank Transfer', status: 'Completed' },
  ]
};

export const mockWithdrawals = {
  availableBalance: 45000,
  minWithdrawal: 500,
  pendingRequests: 1,
  completedWithdrawals: 15,
  rejectedWithdrawals: 0,
  history: [
    { date: '2023-10-26', amount: 10000, tds: 500, admin: 500, donation: 200, net: 8800, status: 'Pending', utr: '-', processed: '-' },
    { date: '2023-10-20', amount: 5000, tds: 250, admin: 250, donation: 100, net: 4400, status: 'Completed', utr: 'HDFC123456789', processed: '2023-10-21' },
  ]
};

export const mockKycData = {
  overallProgress: 60,
  status: 'Partially Verified',
  remainingSteps: 2,
  documents: {
    pan: { status: 'Approved', uploaded: '2023-10-15', expiry: 'Lifetime' },
    aadhaar: { status: 'Approved', uploaded: '2023-10-15', expiry: 'Lifetime' },
    bank: { status: 'Under Review', uploaded: '2023-10-25', expiry: '-' },
    photo: { status: 'Approved', uploaded: '2023-10-15', expiry: 'Lifetime' },
    address: { status: 'Pending', uploaded: '-', expiry: '-' },
  },
  timeline: [
    { step: 'Submitted', status: 'Completed', date: '2023-10-25' },
    { step: 'Under Review', status: 'Active', date: '2023-10-25' },
    { step: 'Approved', status: 'Pending', date: '-' },
  ]
};

export const mockBankDetails = {
  accountHolder: 'John Doe',
  bankName: 'HDFC Bank',
  branch: 'Mumbai Central',
  accountNumber: 'XXXX-XXXX-1234',
  ifsc: 'HDFC0001234',
  upi: 'johndoe@hdfcbank',
  verificationStatus: 'Under Review'
};

export const mockPaymentCenter = {
  membershipAmount: 1500,
  paymentStatus: 'Under Review',
  currentUtr: 'SBI987654321',
  verificationStatus: 'Pending Admin Approval',
  uploadDate: '2023-10-26',
  paymentMethod: 'UPI',
  timeline: [
    { step: 'Payment Uploaded', status: 'Completed', date: '2023-10-26' },
    { step: 'Under Review', status: 'Active', date: '2023-10-26' },
    { step: 'Verified', status: 'Pending', date: '-' },
    { step: 'Activated', status: 'Pending', date: '-' },
  ]
};

