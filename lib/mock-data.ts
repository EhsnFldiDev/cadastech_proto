import { Property, Demand, Deal, Agent, CommissionRule, DailyTask, Tenant } from './types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'mosalas',
    name: 'دپارتمان بزرگ مثلث',
    subTitle: 'تخصصی‌ترین مرکز معاملات ملکی منطقه ۲ و ۵ تهران',
    logoText: 'مثلث',
    primaryColor: '#0e3854', // Navy / Deep Slate
    primaryHover: '#0a2a40',
    accentColor: '#0284c7', // Sky blue
    managerName: 'مهندس آرش شریفی',
    managerRole: 'مدیر عامل و موسس دپارتمان',
    city: 'تهران',
    address: 'سعادت‌آباد، میدان کاج، خیابان سرو غربی، پلاک ۲۴',
    phone: '۰۲۱-۲۲۱۴۵۵۰۰',
    licenseNumber: 'ص/۹۸۴۳۲'
  },
  {
    id: 'diplomat',
    name: 'هلدینگ املاک دیپلمات',
    subTitle: 'ارائه‌دهنده املاک لوکس و پنت‌هاوس‌های شمیرانات (منطقه ۱)',
    logoText: 'دیپلمات',
    primaryColor: '#064e3b', // Deep Emerald
    primaryHover: '#022c22',
    accentColor: '#10b981', // Emerald
    managerName: 'دکتر کیانوش فرهمند',
    managerRole: 'مدیر کل هلدینگ',
    city: 'تهران',
    address: 'زعفرانیه، خیابان مقدس اردبیلی، مجتمع دیپلمات، طبقه ۶',
    phone: '۰۲۱-۲۶۸۰۹۰۰۰',
    licenseNumber: 'ص/۷۶۲۰۱'
  },
  {
    id: 'novin',
    name: 'املاک نوین سعادت‌آباد',
    subTitle: 'شبکه هوشمند معاملات و اجاره مستغلات مدرن',
    logoText: 'نوین',
    primaryColor: '#312e81', // Persian Indigo
    primaryHover: '#1e1b4b',
    accentColor: '#6366f1', // Indigo
    managerName: 'مهندس سهراب یزدانی',
    managerRole: 'مدیر دپارتمان مسکونی',
    city: 'تهران',
    address: 'شهرک غرب، بلوار دادمان، پلاک ۱۱۸',
    phone: '۰۲۱-۸۸۵۶۳۳۰۰',
    licenseNumber: 'ص/۵۴۱۱۹'
  },
  {
    id: 'cadastech-prime',
    name: 'کاداستک پرایم | دفتر نمونه',
    subTitle: 'سامانه ابری مدیریت یکپارچه دپارتمان‌های املاک ایران',
    logoText: 'کاداستک',
    primaryColor: '#18181b', // Zinc / Dark Carbon
    primaryHover: '#09090b',
    accentColor: '#d97706', // Amber / Gold
    managerName: 'علیرضا توکلی',
    managerRole: 'مدیر ارشد عملیات ملکی',
    city: 'تهران',
    address: 'جردن، تقاطع اسفندیار، برج تجارت، طبقه ۴',
    phone: '۰۲۱-۹۱۰۰۲۴۲۴',
    licenseNumber: 'ص/۰۰۱۰۰'
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'سینا پاشایی',
    roleTitle: 'مشاور ارشد رنج فروش (سعادت‌آباد)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '۰۹۱۲۱۱۱۴۴۵۵',
    email: 's.pashaei@cadastech.ir',
    dealsCount: 8,
    monthlyCommission: 142000000, // 142 Million Tomans
    rating: 4.9,
    activeFilesCount: 24,
    activeDemandsCount: 19,
    isOnline: true
  },
  {
    id: 'agent-2',
    name: 'مریم بهرامی',
    roleTitle: 'سرپرست رنج ۱ مسکونی (شهرک غرب)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '۰۹۱۲۲۲۲۶۶۷۷',
    email: 'm.bahrami@cadastech.ir',
    dealsCount: 6,
    monthlyCommission: 118500000,
    rating: 4.95,
    activeFilesCount: 31,
    activeDemandsCount: 22,
    isOnline: true
  },
  {
    id: 'agent-3',
    name: 'امیرحسین رضایی',
    roleTitle: 'مشاور تخصصی رهن و اجاره لوکس',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '۰۹۱۲۳۳۳۸۸۹۹',
    email: 'a.rezaei@cadastech.ir',
    dealsCount: 5,
    monthlyCommission: 76000000,
    rating: 4.8,
    activeFilesCount: 18,
    activeDemandsCount: 15,
    isOnline: false
  },
  {
    id: 'agent-4',
    name: 'نیلوفر افشار',
    roleTitle: 'مشاور فروش پنت‌هاوس و مستغلات',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '۰۹۱۲۴۴۴۱۰۲۰',
    email: 'n.afshar@cadastech.ir',
    dealsCount: 4,
    monthlyCommission: 94000000,
    rating: 4.85,
    activeFilesCount: 16,
    activeDemandsCount: 12,
    isOnline: true
  },
  {
    id: 'agent-5',
    name: 'کاوه مرادی',
    roleTitle: 'مشاور رنج کلنگی و زمین مشارکت',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '۰۹۱۲۵۵۵۳۰۴۰',
    email: 'k.moradi@cadastech.ir',
    dealsCount: 3,
    monthlyCommission: 85000000,
    rating: 4.75,
    activeFilesCount: 12,
    activeDemandsCount: 8,
    isOnline: false
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    code: 'CD-8492',
    title: '۱۴۵ متر ۳ خوابه سوپرلاکچری کلیدنخورده',
    dealType: 'sale',
    propertyType: 'apartment',
    neighborhood: 'سعادت‌آباد',
    district: 2,
    address: 'سعادت‌آباد، میدان بهرود، بلوار شقایق، فرعی دنج',
    area: 145,
    bedrooms: 3,
    floor: 5,
    totalFloors: 6,
    totalPrice: 21750000000, // 21.75 Billion Tomans
    pricePerMeter: 150000000,
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1403,
    ownerName: 'حاج احمد موسوی',
    ownerPhone: '09121156789',
    ownerPhoneMasked: '۰۹۱۲***۶۷۸۹',
    assignedAgentId: 'agent-1',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۲',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    description: 'ساختمان مدرن با لابی مجلل و لابی‌من ۲۴ ساعته، ۲ پارکینگ سندی، نورگیر مستقیم جنوب و شمال، متریال تماماً برند وارداتی، تراس قابل چیدمان.',
    tags: ['کلیدنخورده', '۲ پارکینگ سندی', 'لابی مجلل', 'متریال برند']
  },
  {
    id: 'prop-102',
    code: 'CD-8493',
    title: '۱۸۰ متر ۳ خوابه تک‌واحدی ویو ابدی پارک',
    dealType: 'sale',
    propertyType: 'apartment',
    neighborhood: 'شهرک غرب',
    district: 2,
    address: 'شهرک غرب، فاز ۱، خیابان ایران‌زمین',
    area: 180,
    bedrooms: 3,
    floor: 4,
    totalFloors: 5,
    totalPrice: 32400000000, // 32.4 Billion Tomans
    pricePerMeter: 180000000,
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1401,
    ownerName: 'دکتر صبوری',
    ownerPhone: '09122349876',
    ownerPhoneMasked: '۰۹۱۲***۹۸۷۶',
    assignedAgentId: 'agent-2',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۵',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
    description: 'لوکیشن اعیان‌نشین، پلان تفکیکی بی‌نقص، آشپزخانه فول فرنیش Bosch، استخر سونا جکوزی فعال، سند تک‌برگ شخصی بدون ریشه.',
    tags: ['تک‌واحدی', 'فول مشاعات آبی', 'سند تک‌برگ', 'فول فرنیش']
  },
  {
    id: 'prop-103',
    code: 'CD-8494',
    title: '۱۲۰ متر ۲ خوابه خوش‌نقشه نورگیر عالی',
    dealType: 'rent',
    propertyType: 'apartment',
    neighborhood: 'سعادت‌آباد',
    district: 2,
    address: 'سعادت‌آباد، صرافهای جنوبی، کوچه ۳۱',
    area: 120,
    bedrooms: 2,
    floor: 3,
    totalFloors: 5,
    depositPrice: 800000000, // 800 Million Deposit
    monthlyRent: 35000000, // 35 Million Rent
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1399,
    ownerName: 'خانم مهندس راد',
    ownerPhone: '09124458921',
    ownerPhoneMasked: '۰۹۱۲***۸۹۲۱',
    assignedAgentId: 'agent-3',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۷',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80',
    description: 'واحد کاملاً بازسازی شده، سالن پرده‌خور رو به آفتاب، دسترسی فوق‌العاده به نیایش و یادگار، امکان تبدیل ودیعه و اجاره.',
    tags: ['قابل تبدیل', 'نورگیر عالی', 'بازسازی شده', 'دسترسی سریع']
  },
  {
    id: 'prop-104',
    code: 'CD-8495',
    title: '۲۲۰ متر ۴ خوابه پنت‌هاوس با ۴۰ متر روف‌گاردن اختصاصی',
    dealType: 'sale',
    propertyType: 'apartment',
    neighborhood: 'نیاوران',
    district: 1,
    address: 'نیاوران، خیابان یاسر، کوچه بوستان',
    area: 220,
    bedrooms: 4,
    floor: 7,
    totalFloors: 7,
    totalPrice: 48400000000, // 48.4 Billion Tomans
    pricePerMeter: 220000000,
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1402,
    ownerName: 'مهندس حسینی‌راد',
    ownerPhone: '09126781234',
    ownerPhoneMasked: '۰۹۱۲***۱۲۳۴',
    assignedAgentId: 'agent-4',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۱',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80',
    description: 'ویو ۳۶۰ درجه بدون مشرف، روف گاردن تجهیز شده با آلاچیق و باربیکیو، ارتفاع سقف ۴ متر، ۳ خواب مستر کینگ‌سایز.',
    tags: ['پنت‌هاوس', 'روف‌گاردن', '۳ خواب مستر', 'ویو ۳۶۰']
  },
  {
    id: 'prop-105',
    code: 'CD-8496',
    title: '۱۳۵ متر ۳ خوابه مدرن نوساز',
    dealType: 'sale',
    propertyType: 'apartment',
    neighborhood: 'پاسداران',
    district: 3,
    address: 'پاسداران، بوستان پنجم، فرعی مشجر',
    area: 135,
    bedrooms: 3,
    floor: 2,
    totalFloors: 5,
    totalPrice: 20250000000, // 20.25 Billion Tomans
    pricePerMeter: 150000000,
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1403,
    ownerName: 'آقای صادقی',
    ownerPhone: '09128893456',
    ownerPhoneMasked: '۰۹۱۲***۳۴۵۶',
    assignedAgentId: 'agent-1',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۸',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=600&auto=format&fit=crop&q=80',
    description: 'ساختمان شخصی‌ساز با برترین متریال روز، لابی شیـک، سیستم هوشمند BMS، سالن اجتماعات، سرایداری مقیم.',
    tags: ['سیستم هوشمند BMS', 'شخصی‌ساز', 'سالن اجتماعات']
  },
  {
    id: 'prop-106',
    code: 'CD-8497',
    title: '۹۵ متر ۲ خوابه با تراس بزرگ و دید سبز',
    dealType: 'rent',
    propertyType: 'apartment',
    neighborhood: 'شهرک غرب',
    district: 2,
    address: 'شهرک غرب، بلوار فرحزادی، کوچه گلستان',
    area: 95,
    bedrooms: 2,
    floor: 2,
    totalFloors: 4,
    depositPrice: 600000000,
    monthlyRent: 28000000,
    hasParking: true,
    hasElevator: true,
    hasStorage: true,
    hasBalcony: true,
    yearBuilt: 1398,
    ownerName: 'دکتر غفاری',
    ownerPhone: '09129994321',
    ownerPhoneMasked: '۰۹۱۲***۴۳۲۱',
    assignedAgentId: 'agent-3',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۹',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80',
    description: 'لوکیشن آرام با دسترسی آسان، محله مشجر و دنج، مناسب زوج یا خانواده، مالک بسیار منعطف و ساکن خارج از کشور.',
    tags: ['مالک منعطف', 'تراس کاربردی', 'محیط آرام']
  }
];

export const INITIAL_DEMANDS: Demand[] = [
  {
    id: 'dem-201',
    clientName: 'دکتر فرشید کاظمی',
    clientPhone: '09123451122',
    dealType: 'sale',
    propertyType: 'apartment',
    targetNeighborhoods: ['سعادت‌آباد', 'شهرک غرب'],
    minArea: 130,
    maxArea: 160,
    minBedrooms: 3,
    budgetMin: 19000000000, // 19 Billion
    budgetMax: 23000000000, // 23 Billion
    urgency: 'immediate',
    notes: 'خریدار نقد با تسویه فوری، حتماً دارای پارکینگ و آسانسور، ساختمان نوساز ترجیحاً کلیدنخورده.',
    assignedAgentId: 'agent-1',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۶'
  },
  {
    id: 'dem-202',
    clientName: 'مهندس آرین بهنام',
    clientPhone: '09126783344',
    dealType: 'sale',
    propertyType: 'apartment',
    targetNeighborhoods: ['شهرک غرب', 'سعادت‌آباد', 'پاسداران'],
    minArea: 170,
    maxArea: 200,
    minBedrooms: 3,
    budgetMin: 28000000000,
    budgetMax: 35000000000,
    urgency: 'high',
    notes: 'به دنبال واحد تک‌واحدی با مشاعات آبی یا ویو باز، متریال درجه یک، سند شخصی آماده انتقال.',
    assignedAgentId: 'agent-2',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۷'
  },
  {
    id: 'dem-203',
    clientName: 'خانم ستاره یاری',
    clientPhone: '09128905566',
    dealType: 'rent',
    propertyType: 'apartment',
    targetNeighborhoods: ['سعادت‌آباد', 'شهرک غرب'],
    minArea: 110,
    maxArea: 140,
    minBedrooms: 2,
    maxDeposit: 900000000,
    maxMonthlyRent: 40000000,
    urgency: 'high',
    notes: 'خانواده ۳ نفره، متقاضی واحد تمیز و پرنور، ترجیحاً طبقات میانی با پارکینگ اختصاصی.',
    assignedAgentId: 'agent-3',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۸'
  },
  {
    id: 'dem-204',
    clientName: 'مهندس وحید سپهری',
    clientPhone: '09121237788',
    dealType: 'sale',
    propertyType: 'apartment',
    targetNeighborhoods: ['نیاوران', 'فرمانیه', 'کامرانیه'],
    minArea: 200,
    maxArea: 250,
    minBedrooms: 4,
    budgetMin: 42000000000,
    budgetMax: 50000000000,
    urgency: 'normal',
    notes: 'متقاضی پنت‌هاوس یا طبقه آخر با روف گاردن یا تراس بزرگ، دارای ۳ خواب مستر.',
    assignedAgentId: 'agent-4',
    status: 'active',
    createdAt: '۱۴۰۳/۰۶/۰۳'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-301',
    code: 'DL-901',
    title: 'قرارداد آپارتمان ۱۶۵ متری مروارید',
    propertyId: 'prop-101',
    propertyTitle: '۱۴۵ متر ۳ خوابه سعادت‌آباد',
    clientName: 'دکتر فرشید کاظمی',
    ownerName: 'حاج احمد موسوی',
    dealType: 'sale',
    dealAmount: 21500000000, // 21.5 Billion Tomans
    grossCommission: 215000000, // 1% gross = 215M Tomans
    stage: 'meeting',
    agentId: 'agent-1',
    agentName: 'سینا پاشایی',
    neighborhood: 'سعادت‌آباد',
    createdAt: '۱۴۰۳/۰۶/۰۴',
    updatedAt: '۱۴۰۳/۰۶/۰۹'
  },
  {
    id: 'deal-302',
    code: 'DL-902',
    title: 'قرارداد آپارتمان ۱۸۰ متری ایران‌زمین',
    propertyId: 'prop-102',
    propertyTitle: '۱۸۰ متر ۳ خوابه تک‌واحدی شهرک غرب',
    clientName: 'مهندس آرین بهنام',
    ownerName: 'دکتر صبوری',
    dealType: 'sale',
    dealAmount: 32000000000,
    grossCommission: 320000000,
    stage: 'showing',
    agentId: 'agent-2',
    agentName: 'مریم بهرامی',
    neighborhood: 'شهرک غرب',
    createdAt: '۱۴۰۳/۰۶/۰۶',
    updatedAt: '۱۴۰۳/۰۶/۰۸'
  },
  {
    id: 'deal-303',
    code: 'DL-903',
    title: 'رهن و اجاره آپارتمان ۱۲۰ متری صرافها',
    propertyId: 'prop-103',
    propertyTitle: '۱۲۰ متر ۲ خوابه سعادت‌آباد',
    clientName: 'خانم ستاره یاری',
    ownerName: 'خانم مهندس راد',
    dealType: 'rent',
    dealAmount: 1800000000, // Equivalent volume
    grossCommission: 48000000,
    stage: 'closed',
    agentId: 'agent-3',
    agentName: 'امیرحسین رضایی',
    neighborhood: 'سعادت‌آباد',
    createdAt: '۱۴۰۳/۰۵/۲۸',
    updatedAt: '۱۴۰۳/۰۶/۰۲'
  },
  {
    id: 'deal-304',
    code: 'DL-904',
    title: 'کارشناسی و قیمت‌گذاری ویلایی فاز ۲',
    propertyId: 'prop-105',
    propertyTitle: '۱۳۵ متر ۳ خوابه پاسداران',
    clientName: 'سرمایه‌گذار بهرامی',
    ownerName: 'آقای صادقی',
    dealType: 'sale',
    dealAmount: 20000000000,
    grossCommission: 200000000,
    stage: 'appraisal',
    agentId: 'agent-1',
    agentName: 'سینا پاشایی',
    neighborhood: 'پاسداران',
    createdAt: '۱۴۰۳/۰۶/۰۸',
    updatedAt: '۱۴۰۳/۰۶/۰۹'
  }
];

export const INITIAL_COMMISSION_RULE: CommissionRule = {
  id: 'rule-standard',
  name: 'فرمول استاندارد دپارتمانی (۴۰ - ۱۰ - ۵۰)',
  agentPercent: 40, // سهم مشاور
  managerPercent: 10, // سهم سرپرست رنج
  agencyPercent: 50, // سهم آژانس
  applyMarketingDeduction: true, // کسر ۵٪ بازاریابی و آگهی
  applyTaxDeduction: false,
  marketingDeductionPercent: 5,
  taxDeductionPercent: 9,
  sampleDealCommission: 100000000 // 100M Tomans
};

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'بازدید هماهنگ‌شده با دکتر کاظمی',
    clientName: 'دکتر فرشید کاظمی',
    time: '۱۱:۳۰',
    type: 'showing',
    propertyTitle: '۱۴۵ متر ۳ خوابه سعادت‌آباد',
    completed: false,
    urgency: 'high'
  },
  {
    id: 'task-2',
    title: 'تماس و استعلام تغییر قیمت فایل صرافها',
    clientName: 'خانم مهندس راد (مالک)',
    time: '۱۴:۰۰',
    type: 'call',
    propertyTitle: '۱۲۰ متر ۲ خوابه سعادت‌آباد',
    completed: false,
    urgency: 'medium'
  },
  {
    id: 'task-3',
    title: 'جلسه نشست مقدماتی کمیسیون و توافق',
    clientName: 'مهندس بهنام و دکتر صبوری',
    time: '۱۸:۰۰',
    type: 'meeting',
    propertyTitle: '۱۸۰ متر ایران‌زمین شهرک غرب',
    completed: false,
    urgency: 'high'
  },
  {
    id: 'task-4',
    title: 'بررسی فایل‌های جدید ورودی به سامانه',
    clientName: 'سیستم هوشمند کاداستک',
    time: '۰۹:۳۰',
    type: 'file_check',
    completed: true,
    urgency: 'normal'
  }
];
