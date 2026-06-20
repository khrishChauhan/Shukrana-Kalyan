import {
  Languages,
  Laptop,
  Shield,
  HeartPulse,
  BookOpen,
  Heart,
  Briefcase,
  Users,
  Banknote,
  GraduationCap,
  LucideIcon,
} from 'lucide-react';

export type BenefitStatus = 'eligible' | 'in-progress' | 'locked';

export interface BenefitDetail {
  heading: string;
  content: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: string;
  unlockDays: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  intro: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  contact: string;
}

export const CATEGORIES = [
  'शिक्षा एवं प्रशिक्षण',
  'स्वास्थ्य एवं सुरक्षा',
  'परिवार एवं समाज',
  'आर्थिक सशक्तिकरण',
] as const;

export const benefitsData: Benefit[] = [
  {
    id: 'digital-bhasha-course',
    title: 'डिजिटल भाषा कोर्स',
    description: 'हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं में डिजिटल साक्षरता कोर्स का लाभ उठाएं।',
    category: 'शिक्षा एवं प्रशिक्षण',
    unlockDays: 30,
    icon: Languages,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    intro:
      'यह योजना सदस्यों को हिंदी, अंग्रेजी एवं स्थानीय भाषाओं में डिजिटल साक्षरता प्रदान करती है, जिससे वे ऑनलाइन संसाधनों का सही उपयोग कर सकें।',
    eligibility: ['सदस्यता से 30 दिन पूर्ण होने चाहिए', '18 वर्ष या उससे अधिक आयु', 'वैध सदस्यता कार्ड आवश्यक'],
    benefits: [
      'निःशुल्क ऑनलाइन भाषा कोर्स एक्सेस',
      'सर्टिफिकेट ऑफ कम्प्लीशन',
      'डिजिटल लर्निंग मटेरियल',
    ],
    documents: ['सदस्यता प्रमाण पत्र', 'आधार कार्ड की प्रति', 'पासपोर्ट साइज फोटो'],
    contact: 'helpdesk@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'digital-skill-development',
    title: 'डिजिटल स्किल डेवलपमेंट कोर्स',
    description: 'कंप्यूटर, इंटरनेट और डिजिटल उपकरणों पर व्यावसायिक प्रशिक्षण प्राप्त करें।',
    category: 'शिक्षा एवं प्रशिक्षण',
    unlockDays: 60,
    icon: Laptop,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    intro:
      'यह योजना सदस्यों को डिजिटल दुनिया में आत्मनिर्भर बनाने हेतु कंप्यूटर, स्मार्टफोन और इंटरनेट उपयोग का व्यावसायिक प्रशिक्षण देती है।',
    eligibility: ['सदस्यता से 60 दिन पूर्ण होने चाहिए', 'किसी भी शैक्षणिक पृष्ठभूमि के सदस्य पात्र हैं'],
    benefits: [
      'MS Office, Google Suite, Tally आदि की ट्रेनिंग',
      'व्यावसायिक प्रमाण पत्र',
      'रोजगार सहयोग नेटवर्क',
    ],
    documents: ['सदस्यता कार्ड', 'शैक्षिक प्रमाण पत्र (यदि उपलब्ध हो)', 'आधार कार्ड'],
    contact: 'training@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'durghatna-bima',
    title: 'दुर्घटना बीमा योजना',
    description: 'दुर्घटना की स्थिति में ₹1,00,000 तक की वित्तीय सुरक्षा प्राप्त करें।',
    category: 'स्वास्थ्य एवं सुरक्षा',
    unlockDays: 90,
    icon: Shield,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
    intro:
      'दुर्घटना बीमा योजना के अंतर्गत सदस्य को किसी भी प्रकार की आकस्मिक दुर्घटना पर निर्धारित बीमा राशि का लाभ प्रदान किया जाता है।',
    eligibility: [
      'सदस्यता से 90 दिन पूर्ण होने चाहिए',
      'KYC सत्यापन पूर्ण होना चाहिए',
      'प्रीमियम भुगतान अद्यतन होना चाहिए',
    ],
    benefits: [
      '₹1,00,000 तक दुर्घटना बीमा कवर',
      'अस्पताल खर्च पुनर्भरण',
      'परिवहन सहायता',
    ],
    documents: ['FIR / दुर्घटना रिपोर्ट', 'चिकित्सा प्रमाण पत्र', 'बैंक विवरण', 'सदस्यता प्रमाण पत्र'],
    contact: 'insurance@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'emergency-health',
    title: 'इमरजेंसी हेल्थ सहायता योजना',
    description: 'चिकित्सा आपातकाल में तत्काल वित्तीय सहायता और मार्गदर्शन पाएं।',
    category: 'स्वास्थ्य एवं सुरक्षा',
    unlockDays: 180,
    icon: HeartPulse,
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-50',
    intro:
      'इमरजेंसी हेल्थ सहायता योजना सदस्यों को गंभीर चिकित्सा स्थितियों में तात्कालिक आर्थिक सहायता एवं स्वास्थ्य सेवाओं तक पहुंच सुनिश्चित करती है।',
    eligibility: [
      'सदस्यता से 180 दिन पूर्ण होने चाहिए',
      'आपातकालीन अस्पताल में भर्ती का प्रमाण',
      'पूर्व में इस योजना का लाभ न लिया हो (12 माह में)',
    ],
    benefits: [
      '₹50,000 तक की आपातकालीन सहायता',
      '24×7 स्वास्थ्य परामर्श हेल्पलाइन',
      'नेटवर्क अस्पतालों में प्राथमिकता',
    ],
    documents: ['अस्पताल प्रवेश पर्ची', 'चिकित्सक का प्रमाण पत्र', 'आधार कार्ड', 'सदस्यता प्रमाण पत्र'],
    contact: 'health@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'kanya-shiksha-kit',
    title: 'कन्या शिक्षा किट योजना',
    description: 'बालिकाओं की शिक्षा हेतु निःशुल्क शिक्षण सामग्री किट प्रदान की जाती है।',
    category: 'परिवार एवं समाज',
    unlockDays: 90,
    icon: BookOpen,
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    intro:
      'कन्या शिक्षा किट योजना बालिकाओं को गुणवत्तापूर्ण शिक्षा की ओर प्रोत्साहित करने हेतु आवश्यक शैक्षणिक सामग्री निःशुल्क उपलब्ध कराती है।',
    eligibility: [
      'सदस्यता से 90 दिन पूर्ण होने चाहिए',
      'सदस्य के परिवार में 5-18 वर्ष की बालिका हो',
      'बालिका का विद्यालय में नामांकन हो',
    ],
    benefits: [
      'स्कूल बैग, नोटबुक, स्टेशनरी',
      'यूनिफॉर्म सहायता',
      'शैक्षणिक पुस्तकें',
    ],
    documents: ['बालिका का आयु प्रमाण', 'विद्यालय प्रवेश पत्र', 'सदस्यता प्रमाण पत्र', 'अभिभावक का पहचान पत्र'],
    contact: 'welfare@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'kanya-vivah-shagun',
    title: 'कन्या विवाह शगुन योजना',
    description: 'पात्र सदस्यों की बेटी के विवाह पर शगुन राशि और सहयोग प्रदान किया जाता है।',
    category: 'परिवार एवं समाज',
    unlockDays: 365,
    icon: Heart,
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
    intro:
      'कन्या विवाह शगुन योजना के अंतर्गत पात्र सदस्यों की पुत्री के विवाह अवसर पर संस्था की ओर से शगुन राशि एवं उपहार प्रदान किया जाता है।',
    eligibility: [
      'सदस्यता से 365 दिन (1 वर्ष) पूर्ण होने चाहिए',
      'विवाह का पंजीकृत आमंत्रण पत्र',
      'KYC सत्यापन पूर्ण होना चाहिए',
    ],
    benefits: [
      '₹5,100 शगुन राशि',
      'संस्था की ओर से उपहार',
      'वैवाहिक परामर्श सेवा',
    ],
    documents: ['विवाह आमंत्रण पत्र', 'बालिका का आयु प्रमाण', 'विवाह पंजीकरण (उपलब्ध होने पर)', 'सदस्यता प्रमाण पत्र'],
    contact: 'welfare@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'rojgar-yojana',
    title: 'रोजगार योजना',
    description: 'नौकरी अवसर, करियर मार्गदर्शन और रोजगार मेले में भागीदारी का लाभ उठाएं।',
    category: 'आर्थिक सशक्तिकरण',
    unlockDays: 120,
    icon: Briefcase,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    intro:
      'रोजगार योजना सदस्यों को उनकी योग्यता के अनुसार रोजगार के अवसर, करियर परामर्श और संगठन के नेटवर्क के माध्यम से नौकरी खोजने में सहायता प्रदान करती है।',
    eligibility: [
      'सदस्यता से 120 दिन पूर्ण होने चाहिए',
      '18-45 वर्ष आयु सीमा',
      'न्यूनतम 8वीं कक्षा उत्तीर्ण',
    ],
    benefits: [
      'रोजगार मेले में प्राथमिकता प्रवेश',
      'करियर काउंसलिंग सेशन',
      'रिज्यूमे और इंटरव्यू तैयारी सहायता',
    ],
    documents: ['शैक्षिक प्रमाण पत्र', 'पहचान पत्र', 'सदस्यता प्रमाण पत्र', 'पासपोर्ट साइज फोटो'],
    contact: 'employment@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'mahila-sashaktikaran',
    title: 'महिला सशक्तिकरण योजना',
    description: 'महिला सदस्यों के लिए कौशल, नेतृत्व और स्वरोजगार कार्यक्रम।',
    category: 'आर्थिक सशक्तिकरण',
    unlockDays: 90,
    icon: Users,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    intro:
      'महिला सशक्तिकरण योजना के तहत महिला सदस्यों को नेतृत्व, उद्यमिता और स्वरोजगार के लिए प्रशिक्षण एवं मार्गदर्शन प्रदान किया जाता है।',
    eligibility: [
      'महिला सदस्य (18 वर्ष या अधिक)',
      'सदस्यता से 90 दिन पूर्ण होने चाहिए',
    ],
    benefits: [
      'उद्यमिता प्रशिक्षण कार्यक्रम',
      'स्व-सहायता समूह नेटवर्क',
      'माइक्रो-फाइनेंस सहायता',
    ],
    documents: ['महिला पहचान प्रमाण', 'आधार कार्ड', 'सदस्यता प्रमाण पत्र'],
    contact: 'women@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'zero-interest-loan',
    title: '0% ब्याज ऋण योजना',
    description: 'बिना ब्याज के अल्पकालिक ऋण प्राप्त करें और आर्थिक रूप से आत्मनिर्भर बनें।',
    category: 'आर्थिक सशक्तिकरण',
    unlockDays: 365,
    icon: Banknote,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    intro:
      '0% ब्याज ऋण योजना के अंतर्गत पात्र सदस्यों को आर्थिक जरूरतों को पूरा करने के लिए शून्य ब्याज दर पर अल्पकालिक ऋण प्रदान किया जाता है।',
    eligibility: [
      'सदस्यता से 365 दिन पूर्ण होने चाहिए',
      'KYC और CIBIL स्कोर सत्यापन',
      'नियमित सदस्यता शुल्क भुगतान',
    ],
    benefits: [
      '₹25,000 तक 0% ब्याज ऋण',
      '12 समान मासिक किस्तों में पुनर्भुगतान',
      'न्यूनतम दस्तावेज प्रक्रिया',
    ],
    documents: ['आय प्रमाण पत्र', 'बैंक विवरण (6 माह)', 'आधार और पैन कार्ड', 'सदस्यता प्रमाण पत्र'],
    contact: 'loans@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
  {
    id: 'shikshit-bharat',
    title: 'शिक्षित भारत योजना',
    description: 'उच्च शिक्षा के लिए छात्रवृत्ति और शैक्षिक सहायता कार्यक्रम।',
    category: 'शिक्षा एवं प्रशिक्षण',
    unlockDays: 180,
    icon: GraduationCap,
    iconColor: 'text-sky-600',
    iconBg: 'bg-sky-50',
    intro:
      'शिक्षित भारत योजना सदस्यों और उनके आश्रित बच्चों को उच्च शिक्षा हेतु छात्रवृत्ति और शैक्षिक सहायता प्रदान कर एक शिक्षित समाज निर्माण में योगदान देती है।',
    eligibility: [
      'सदस्यता से 180 दिन पूर्ण होने चाहिए',
      'छात्र की आयु 15-25 वर्ष हो',
      'न्यूनतम 60% अंक पिछली परीक्षा में',
    ],
    benefits: [
      '₹10,000 वार्षिक छात्रवृत्ति',
      'ऑनलाइन लाइब्रेरी एक्सेस',
      'कोचिंग एवं मेंटरशिप सहायता',
    ],
    documents: ['अंकतालिका (पिछली परीक्षा)', 'कॉलेज / विश्वविद्यालय प्रवेश पत्र', 'आधार कार्ड', 'सदस्यता प्रमाण पत्र'],
    contact: 'education@shukranakalyan.org | +91-XXXX-XXXXXX',
  },
];

// Mock member join date — 148 days ago
export const MEMBER_JOIN_DATE = new Date(Date.now() - 148 * 24 * 60 * 60 * 1000);

export function getMemberDays(): number {
  const diffMs = Date.now() - MEMBER_JOIN_DATE.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getBenefitStatus(unlockDays: number, currentDays: number): BenefitStatus {
  if (currentDays >= unlockDays) return 'eligible';
  if (currentDays > 0) return 'in-progress';
  return 'locked';
}

export function getNextUnlock(currentDays: number): Benefit | null {
  const locked = benefitsData
    .filter((b) => currentDays < b.unlockDays)
    .sort((a, b) => a.unlockDays - b.unlockDays);
  return locked[0] ?? null;
}
