// FIX: Corrected import path for types
import type { Category, Service, Review, News, Notification, Property, EmergencyContact, ServiceGuide, AppUser, Supervisor, Driver, WeeklyScheduleItem, ExternalRoute, PublicPagesContent, Post, Advertisement, AboutCityPageContent, AdminUser, AuditLog, MarketplaceItem, JobPosting, Circle, LostAndFoundItem, ExclusiveOffer, UserOffer, InternalRoute } from '../types';

export const mockReviews: Review[] = [
    { id: 1, userId: 1, username: 'أحمد محمود', avatar: 'https://picsum.photos/101', rating: 5, comment: 'خدمة ممتازة وتجربة رائعة! أنصح به بشدة.', date: '2024-07-10', adminReply: 'شكراً لتقييمك! نسعد بخدمتك دائماً.', helpfulCount: 12 },
    { id: 2, userId: 2, username: 'فاطمة الزهراء', avatar: 'https://picsum.photos/102', rating: 4, comment: 'المكان جميل والخدمة جيدة، لكن الأسعار مرتفعة قليلاً.', date: '2024-07-08', helpfulCount: 5 },
    { id: 3, userId: 3, username: 'خالد العتيبي', avatar: 'https://picsum.photos/103', rating: 3, comment: 'التأخير في تقديم الخدمة كان ملحوظاً.', date: '2024-07-05', adminReply: 'نعتذر عن التأخير، نعمل على تحسين سرعة الخدمة.', helpfulCount: 2 },
    { id: 4, userId: 4, username: 'سارة عبدالله', avatar: 'https://picsum.photos/106', rating: 5, comment: 'كل شيء كان مثالياً، شكراً لكم.', date: '2024-07-02', helpfulCount: 25 },
];

export const mockServices: Service[] = [
    // مطاعم (subCategoryId: 301)
    {
        id: 1, subCategoryId: 301, ownerId: 1, name: "مطعم ومقهى هيليو", images: ["https://picsum.photos/800/600?random=1", "https://picsum.photos/800/600?random=2", "https://picsum.photos/800/600?random=3", "https://picsum.photos/800/600?random=4"],
        address: "المنطقة الأولى، هليوبوليس الجديدة", phone: ["011-123-4567", "02-2345-6789"], whatsapp: ["966501234567"],
        about: "نقدم أشهى المأكولات الشرقية والغربية في أجواء عصرية ومريحة. لدينا جلسات داخلية وخارجية لتناسب جميع الأذواق.",
        rating: 4.5, reviews: mockReviews, facebookUrl: "#", instagramUrl: "#", isFavorite: true, views: 4821, creationDate: '2024-07-20',
        locationUrl: "https://maps.app.goo.gl/mE23vXqx4vSPxV987",
        workingHours: "السبت - الخميس: 9ص - 1ص\nالجمعة: 1م - 1ص"
    },
    {
        id: 2, subCategoryId: 301, ownerId: 2, name: "مطعم أسماك المحيط", images: ["https://picsum.photos/800/600?random=10"],
        address: "مول سيتي بلازا", phone: ["012-987-6543"], whatsapp: [],
        about: "أفضل المأكولات البحرية الطازجة والمعدة على أيدي أمهر الطهاة.",
        rating: 4.8, reviews: [], facebookUrl: "#", instagramUrl: "#", isFavorite: false, views: 3560, creationDate: '2024-07-15'
    },
    // كافيهات (subCategoryId: 302)
    {
        id: 3, subCategoryId: 302, name: "كافيه روز جاردن", images: ["https://picsum.photos/800/600?random=110"],
        address: "مول سيتي بلازا، الطابق الأرضي", phone: ["012-345-6789"], whatsapp: ["966509876543"],
        about: "مكان مثالي للاسترخاء مع الأصدقاء والاستمتاع بأفضل أنواع القهوة والمشروبات المنعشة والحلويات اللذيذة.",
        rating: 4.7, reviews: [], facebookUrl: "#", instagramUrl: "#", isFavorite: false, views: 5123, creationDate: '2024-06-30',
        workingHours: "يومياً: 10ص - 12ص"
    },
    // مستشفيات (subCategoryId: 201)
     {
        id: 4, subCategoryId: 201, name: "مستشفى هليوبوليس المركزي", images: ["https://picsum.photos/800/600?random=5", "https://picsum.photos/800/600?random=6"],
        address: "الحي الطبي، هليوبوليس الجديدة", phone: ["02-555-0100", "16001"], whatsapp: ["966555010010"],
        about: "مستشفى متكامل يقدم خدمات طبية على مدار 24 ساعة في جميع التخصصات.",
        rating: 4.2, reviews: [], facebookUrl: "#", instagramUrl: "#", isFavorite: true, views: 6890, creationDate: '2024-06-10',
        workingHours: "24/7"
    },
    // لياقة بدنية (subCategoryId: 701)
    {
        id: 5, subCategoryId: 701, name: "جيم فيتنس برو", images: ["https://picsum.photos/800/600?random=20"],
        address: "المنطقة الرياضية", phone: ["010-123-4567"], whatsapp: [],
        about: "أحدث الأجهزة الرياضية ومدربين محترفين لمساعدتك في الوصول لهدفك.",
        rating: 4.9, reviews: [], facebookUrl: "#", instagramUrl: "#", isFavorite: false, views: 2500, creationDate: '2024-07-22'
    },
    // جمال وعناية (subCategoryId: 801)
    {
        id: 6, subCategoryId: 801, ownerId: 1, name: "صالون بيوتي كوين", images: ["https://picsum.photos/800/600?random=25"],
        address: "مول سيتي بلازا، الطابق الأول", phone: ["011-987-6543"], whatsapp: [],
        about: "جميع خدمات التجميل والعناية بالشعر والبشرة للسيدات.",
        rating: 4.6, reviews: [], facebookUrl: "#", instagramUrl: "#", isFavorite: true, views: 1800, creationDate: '2024-07-18'
    },
];

export const mockCategories: Category[] = [
    {
        id: 1, name: "المدينة والجهاز", icon: 'BuildingLibraryIcon',
        subCategories: [
            { id: 105, name: "تعريف بشركة مصر الجديده (المالك)" },
            { id: 101, name: "التعريف بالمدينة" },
        ]
    },
    {
        id: 2, name: "الصحة", icon: 'HeartIcon',
        subCategories: [
            { id: 201, name: "مستشفيات" },
            { id: 202, name: "مراكز طبية" },
            { id: 203, name: "أطباء" },
            { id: 204, name: "صيدليات" },
        ]
    },
    {
        id: 3, name: "الطعام والشراب", icon: 'CakeIcon',
        subCategories: [
            { id: 301, name: "مطاعم" },
            { id: 302, name: "كافيهات" },
            { id: 303, name: "سوبر ماركت" },
        ]
    },
    {
        id: 4, name: "التعليم", icon: 'AcademicCapIcon',
        subCategories: [
            { id: 401, name: "مدارس" },
            { id: 402, name: "حضانات" },
        ]
    },
    {
        id: 5, name: "التسوق", icon: 'ShoppingBagIcon',
        subCategories: [
            { id: 501, name: "سوبر ماركت وعطارة" },
            { id: 502, name: "مخابز" },
            { id: 503, name: "أسواق خضار وفاكهة" },
            { id: 504, name: "طيور وجزارة وأسماك" },
            { id: 505, name: "محلات ملابس واكسسوات" },
            { id: 506, name: "محلات أدوات منزلية" }
        ]
    },
    {
        id: 6, name: "تكنولوجيا واتصالات", icon: 'DevicePhoneMobileIcon',
        subCategories: [
            { id: 601, name: "أنظمة مراقبة والانتركم" },
            { id: 602, name: "الكترونيات" },
            { id: 603, name: "انترنت ودش" },
            { id: 604, name: "خدمات المحمول" }
        ]
    },
    {
        id: 7, name: "اللياقة البدنية", icon: 'BoltIcon',
        subCategories: [
            { id: 701, name: "صالات الجيم" },
            { id: 702, name: "مدربين شخصيين" },
            { id: 703, name: "اكاديمات رياضية" },
            { id: 704, name: "نوادي رياضية" }
        ]
    },
    {
        id: 8, name: "الجمال والعناية الشخصية", icon: 'SparklesIcon',
        subCategories: [
            { id: 801, name: "صالون تجميل" },
            { id: 802, name: "مستحضرات تجميل" },
            { id: 803, name: "منتجات العناية بالبشرة" },
            { id: 804, name: "مراكز سبا" }
        ]
    },
    {
        id: 9, name: "الصيانه والخدمات المنزلية", icon: 'WrenchScrewdriverIcon',
        subCategories: [
            { id: 901, name: "سباكة وكهرباء" },
            { id: 902, name: "نظافة منزلية" },
            { id: 903, name: "صيانه الأجهزة الكهربائية" },
            { id: 904, name: "صيانة البوتاجاز والسخان" },
            { id: 905, name: "صيانه وتركيب التكييفات" },
            { id: 906, name: "مغسلة ومكوجي" }
        ]
    },
    {
        id: 10, name: "السيارات", icon: 'CarIcon',
        subCategories: [
            { id: 1001, name: "ورش السيارات" },
            { id: 1002, name: "قطع غيار" },
            { id: 1003, name: "محطات وقود" },
            { id: 1004, name: "غسيل سيارات" }
        ]
    },
    {
        id: 11, name: "خدمات متنوعة", icon: 'Squares2X2Icon',
        subCategories: [
            { id: 1101, name: "تصوير ومونتاج" },
            { id: 1102, name: "خدمات توصيل" },
            { id: 1103, name: "خدمات لاند سكيب" },
            { id: 1104, name: "خدمات مصرفية" },
            { id: 1105, name: "العناية بالحيوانات الاليفة" }
        ]
    },
    {
        id: 12, name: "أنشطة وفعاليات", icon: 'GiftIcon',
        subCategories: [
            { id: 1201, name: "أنشطة الأطفال" },
            { id: 1202, name: "مراكز ترفية" },
            { id: 1203, name: "دورات ومهارات" }
        ]
    },
    {
        id: 13, name: "التشطيبات", icon: 'PaintBrushIcon',
        subCategories: [
            { id: 1301, name: "شركات او مقاول تشطيب" },
            { id: 1302, name: "تشطيب كهرباء" },
            { id: 1303, name: "تشطيب سباكة" },
            { id: 1304, name: "تشطيب محارة واعمال جبس" },
            { id: 1305, name: "تشطيب دهانات" },
            { id: 1306, name: "تشطيب سيراميك ورخام" },
            { id: 1307, name: "باب وشباك" },
            { id: 1308, name: "الموان" },
            { id: 1309, name: "تشطيبات خارجية" }
        ]
    }
];

export const mockNews: News[] = [
    {
        id: 1,
        title: "افتتاح المرحلة الأولى من النادي الاجتماعي بهليوبوليس الجديدة",
        content: "تم بحمد الله افتتاح المرحلة الأولى من النادي الاجتماعي، والتي تضم ملاعب وحمام سباحة، في حضور عدد من المسؤولين وسكان المدينة.",
        imageUrl: "https://picsum.photos/600/400?random=11",
        date: "2024-07-15",
        author: "إدارة المدينة",
        externalUrl: "#",
        views: 1205
    },
    {
        id: 2,
        title: "بدء تشغيل خطوط النقل الداخلي الجديدة",
        content: "لتسهيل حركة السكان داخل المدينة، تم تشغيل ثلاثة خطوط نقل داخلي جديدة تغطي كافة الأحياء والمناطق الحيوية.",
        imageUrl: "https://picsum.photos/600/400?random=12",
        date: "2024-07-10",
        author: "جهاز النقل",
        externalUrl: "#",
        views: 980
    },
    {
        id: 3,
        title: "حملة تشجير وتجميل مداخل المدينة",
        content: "شارك العشرات من السكان في حملة تجميل وتشجير المداخل الرئيسية للمدينة، مما يضفي مظهراً جمالياً وحضارياً.",
        imageUrl: "https://picsum.photos/600/400?random=13",
        date: "2024-07-05",
        author: "لجنة البيئة",
        views: 750
    },
    {
        id: 4,
        title: "جدول انقطاع المياه المخطط له لأعمال الصيانة",
        content: "نحيط علم سيادتكم بأنه سيتم قطع المياه عن المنطقة الثالثة يوم الثلاثاء القادم من الساعة 10 صباحاً حتى 4 عصراً لأعمال الصيانة الدورية.",
        imageUrl: "https://picsum.photos/600/400?random=14",
        date: "2024-07-02",
        author: "شركة المياه",
        views: 2100
    },
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: 'عرض الصيف في مطعم ومقهى هيليو!',
    imageUrl: 'https://picsum.photos/800/400?random=101',
    serviceId: 1,
    startDate: '2024-07-01',
    endDate: '2025-10-31',
  },
  {
    id: 2,
    title: 'افتتاح كافيه روز جاردن!',
    imageUrl: 'https://picsum.photos/800/400?random=103',
    serviceId: 3,
    startDate: '2024-07-15',
    endDate: '2025-10-31',
  },
  {
    id: 3,
    title: 'تخفيضات كبرى على العقارات',
    imageUrl: 'https://picsum.photos/800/400?random=102',
    externalUrl: '#',
    startDate: '2024-08-01',
    endDate: '2025-10-31',
  },
];


export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'صيانة طارئة لشبكة المياه',
    content: 'سيتم قطع المياه عن الحي الأول غداً من الساعة 10 صباحاً حتى 2 ظهراً لأعمال صيانة طارئة. نعتذر عن الإزعاج.',
    startDate: '2024-07-25',
    endDate: '2024-07-25',
    externalUrl: '#'
  },
  {
    id: 2,
    title: 'حملة تطعيم جديدة للأطفال',
    content: 'تعلن مستشفى هليوبوليس المركزي عن بدء حملة تطعيم شلل الأطفال من 1 أغسطس إلى 15 أغسطس.',
    serviceId: 4,
    startDate: '2024-08-01',
    endDate: '2024-08-15',
  },
  {
    id: 3,
    title: 'إشعار قادم',
    content: 'هذا الإشعار لم يبدأ بعد.',
    startDate: '2025-01-01',
    endDate: '2025-01-05',
  },
  {
    id: 4,
    title: 'إشعار منتهي الصلاحية',
    content: 'هذا العرض انتهى الأسبوع الماضي.',
    startDate: '2024-07-01',
    endDate: '2024-07-07',
  },
];

export const mockProperties: Property[] = [
    {
        id: 1,
        title: "شقة فاخرة للبيع في كمبوند لايف بارك",
        description: "شقة بمساحة 180 متر مربع، تشطيب سوبر لوكس، 3 غرف نوم، 2 حمام، ريسبشن كبير، فيو مفتوح على حديقة.",
        images: ["https://picsum.photos/800/600?random=21", "https://picsum.photos/800/600?random=22"],
        location: { address: "كمبوند لايف بارك، هليوبوليس الجديدة" },
        type: 'sale',
        price: 2500000,
        contact: { name: "المالك", phone: "01001234567" },
        amenities: ["أمن 24 ساعة", "جراج خاص", "حديقة", "مصعد"],
        views: 1543,
        creationDate: '2024-07-18'
    },
    {
        id: 2,
        title: "فيلا للإيجار في حي الزهور",
        description: "فيلا مستقلة بمساحة 400 متر، حديقة خاصة 200 متر، حمام سباحة، 5 غرف نوم، مفروشة بالكامل.",
        images: ["https://picsum.photos/800/600?random=23", "https://picsum.photos/800/600?random=24"],
        location: { address: "الحي الثاني، فيلات، هليوبوليس الجديدة" },
        type: 'rent',
        price: 30000,
        contact: { name: "مكتب تسويق", phone: "01229876543" },
        amenities: ["حمام سباحة", "حديقة خاصة", "مفروشة بالكامل", "مطبخ مجهز"],
        views: 876,
        creationDate: '2024-07-05'
    },
    {
        id: 3,
        title: "دوبلكس للبيع بإطلالة مميزة",
        description: "دوبلكس 250 متر + روف 100 متر، موقع مميز على شارع رئيسي، نصف تشطيب، إمكانية التسهيلات في السداد.",
        images: ["https://picsum.photos/800/600?random=25", "https://picsum.photos/800/600?random=26"],
        location: { address: "الحي الثالث، هليوبوليس الجديدة" },
        type: 'sale',
        price: 3200000,
        contact: { name: "شركة التطوير العقاري", phone: "01117654321" },
        amenities: ["روف خاص", "فيو مفتوح", "قسط على سنتين"],
        views: 2041,
        creationDate: '2024-06-25'
    },
];

export const mockEmergencyContacts: EmergencyContact[] = [
    { id: 1, title: "رقم رئيس الجهاز", number: "0121234567", type: 'city' },
    { id: 2, title: "رقم مدير الامن", number: "0121234568", type: 'city' },
    { id: 3, title: "رقم خدمة العملاء", number: "0121234569", type: 'city' },
    { id: 4, title: "طوارئ كهرباء المدينة", number: "12348", type: 'city' },
    { id: 5, title: "طوارئ مياه المدينة", number: "12349", type: 'city' },
    { id: 6, title: "طوارئ غاز المدينة", number: "12350", type: 'city' },
    { id: 7, title: "طوارئ تليفونات المدينة", number: "12351", type: 'city' },
    { id: 8, title: "طلب الإسعاف", number: "123", type: 'national' },
    { id: 9, title: "أعطال الكهرباء", number: "121", type: 'national' },
    { id: 10, title: "الاستغاثة بالأمن العام", number: "115", type: 'national' },
    { id: 11, title: "الشكاوي الحكومية", number: "16528", type: 'national' },
    { id: 12, title: "الحالات الصحية الحرجة", number: "137", type: 'national' },
    { id: 13, title: "تسريب الغاز", number: "149-129", type: 'national' },
    { id: 14, title: "الإبلاغ عن جرائم المعلومات", number: "15008", type: 'national' },
    { id: 15, title: "شكاوي الاتصالات", number: "155", type: 'national' },
    { id: 16, title: "الاستغاثة بالطب الوقائي", number: "105", type: 'national' },
    { id: 17, title: "الصرف الصحي", number: "175", type: 'national' },
    { id: 18, title: "خدمات الطرق السريعة", number: "01221110000", type: 'national' },
    { id: 19, title: "إنقاذ المشردين", number: "16439", type: 'national' },
    { id: 20, title: "الخط الساخن لمكافحة الإدمان", number: "16023", type: 'national' },
    { id: 21, title: "الاستغاثة بالمطافئ", number: "180", type: 'national' },
    { id: 22, title: "الاستغاثة بشرطة النقل", number: "145", type: 'national' },
    { id: 23, title: "شرطة السياحة", number: "126", type: 'national' },
    { id: 24, title: "أعطال المياه", number: "125", type: 'national' },
    { id: 25, title: "طلب النجدة", number: "122", type: 'national' },
    { id: 26, title: "التواصل مع حماية المستهلك", number: "19588", type: 'national' },
    { id: 27, title: "الإبلاغ عن التحرش بالأطفال", number: "16000", type: 'national' },
];

export const mockServiceGuides: ServiceGuide[] = [
    {
        id: 1,
        title: "التقديم على عداد مياه",
        steps: [
            "تقديم طلب بالمركز التجاري لجهاز المدينة.",
            "سداد رسوم المعاينة والتوريد.",
            "إجراء المعاينة الفنية بواسطة الفني المختص.",
            "استلام العداد وتركيبه بعد استيفاء الشروط.",
        ],
        documents: [
            "صورة بطاقة الرقم القومي سارية.",
            "صورة عقد الملكية أو التخصيص.",
            "آخر إيصال سداد رسوم الصيانة.",
            "توكيل رسمي في حالة عدم حضور المالك.",
        ],
    },
    {
        id: 2,
        title: "التقديم على عداد كهرباء",
        steps: [
            "شراء كراسة الشروط من شركة الكهرباء.",
            "تقديم المستندات المطلوبة ودفع الرسوم.",
            "تحديد موعد للمعاينة الفنية.",
            "تركيب العداد بعد الموافقة.",
        ],
        documents: [
            "صورة بطاقة الرقم القومي.",
            "موافقة من جهاز المدينة.",
            "صورة رخصة البناء.",
        ],
    },
    {
        id: 3,
        title: "استخراج تصريح تشطيب",
        steps: [
            "تقديم طلب لإدارة التنمية بالجهاز.",
            "تحديد نوع التشطيبات (داخلية/خارجية).",
            "سداد تأمين أعمال قابل للاسترداد.",
            "الحصول على التصريح والبدء في الأعمال.",
        ],
        documents: [
            "صورة بطاقة المالك.",
            "صورة محضر استلام الوحدة.",
            "مخطط تفصيلي بالأعمال المطلوبة.",
        ],
    },
     {
        id: 4,
        title: "تصريح خروج أثاث",
        steps: [
            "التوجه لمكتب أمن الجهاز.",
            "إثبات ملكية الوحدة.",
            "تسجيل بيانات السيارة التي ستقوم بالنقل.",
            "الحصول على التصريح وتسليمه لأمن البوابة عند الخروج.",
        ],
        documents: [
            "أصل بطاقة الرقم القومي للمالك.",
            "صورة من عقد الملكية.",
            "آخر إيصال سداد صيانة.",
        ],
    },
];

export const mockUsers: AppUser[] = [
  { id: 1, name: 'أحمد محمود', email: 'ahmed.masri@example.com', password: 'password', avatar: 'https://picsum.photos/101', status: 'active', role: 'service_provider', joinDate: '2023-05-12' },
  { id: 2, name: 'فاطمة الزهراء', email: 'fatima.z@example.com', password: 'password', avatar: 'https://picsum.photos/102', status: 'active', role: 'service_provider', joinDate: '2023-06-20' },
  { id: 3, name: 'خالد العتيبي', email: 'khaled.a@example.com', password: 'password', avatar: 'https://picsum.photos/103', status: 'pending', role: 'user', joinDate: '2024-01-10' },
  { id: 4, name: 'سارة عبدالله', email: 'sara.ibrahim@example.com', password: 'password', avatar: 'https://picsum.photos/106', status: 'banned', role: 'user', joinDate: '2023-03-15' },
  { id: 5, name: 'محمد حسين', email: 'mohamed.h@example.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=5', status: 'active', role: 'user', joinDate: '2023-09-01' },
  { id: 6, name: 'نور الهدى', email: 'nour.h@example.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=6', status: 'pending', role: 'user', joinDate: '2024-02-05' },
  { id: 7, name: 'مستخدم تجريبي', email: 'test@test.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=7', status: 'active', role: 'user', joinDate: '2024-01-01' },
];

export const mockAdmins: AdminUser[] = [
    { id: 1, name: 'المدير العام', email: 'admin@helio.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=99', role: 'مدير عام' },
    { id: 2, name: 'مسؤول الخدمات', email: 'services@helio.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=98', role: 'مسؤول ادارة الخدمات' },
    { id: 3, name: 'مسؤول العقارات', email: 'properties@helio.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=97', role: 'مسؤول العقارات' },
    { id: 4, name: 'مسؤول الأخبار', email: 'news@helio.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=96', role: 'مسؤول الاخبار والاعلانات والاشعارات' },
    { id: 5, name: 'مسؤول الباصات', email: 'transport@helio.com', password: 'password', avatar: 'https://picsum.photos/200/200?random=95', role: 'مسؤول الباصات' },
];

export const mockAuditLogs: AuditLog[] = [
    { id: 1, user: 'المدير العام', action: 'إنشاء خدمة', details: 'أضاف خدمة جديدة: مطعم ومقهى هيليو', timestamp: '2024-07-28T10:00:00Z' },
    { id: 2, user: 'مسؤول العقارات', action: 'حذف عقار', details: 'حذف عقار: شقة فاخرة للبيع في كمبوند لايف بارك', timestamp: '2024-07-28T09:30:00Z' },
    { id: 3, user: 'مسؤول الاخبار والاعلانات والاشعارات', action: 'تحديث خبر', details: 'تحديث خبر: افتتاح المرحلة الأولى من النادي', timestamp: '2024-07-27T15:20:00Z' },
    { id: 4, user: 'المدير العام', action: 'تعديل مستخدم', details: 'قام بتغيير حالة المستخدم خالد العتيبي إلى "مفعل"', timestamp: '2024-07-27T11:05:00Z' },
];

export const mockCircles: Circle[] = [
  { id: 1, name: 'الدائرة العامة', description: 'نقاشات عامة تهم جميع سكان المدينة' },
  { id: 2, name: 'دائرة الحي الخامس', description: 'خاصة بسكان وأمور الحي الخامس' },
  { id: 3, name: 'دائرة كمبوند الزهور', description: 'للتواصل بين سكان كمبوند الزهور' },
  { id: 4, name: 'دائرة لايف بارك', description: 'خاصة بسكان كمبوند لايف بارك' },
  { id: 5, name: 'دائرة الخدمات', description: 'لمناقشة جودة الخدمات وتقييمها' },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    circleId: 1,
    userId: 1,
    username: 'أحمد محمود',
    avatar: 'https://picsum.photos/101',
    title: 'تجمع ملاك الحي الأول',
    content: 'السلام عليكم، أقترح أن نقوم بإنشاء مجموعة واتساب خاصة بملاك الحي الأول لمناقشة الأمور الهامة ومتابعة المستجدات. ما رأيكم؟',
    category: 'نقاش',
    date: '2024-07-28',
    likes: [2, 3, 4],
    comments: [
      { id: 101, userId: 2, username: 'فاطمة الزهراء', avatar: 'https://picsum.photos/102', content: 'فكرة ممتازة! أنا معكم.', date: '2024-07-28' },
      { id: 102, userId: 3, username: 'خالد العتيبي', avatar: 'https://picsum.photos/103', content: 'ياليت والله، راح تسهل علينا كثير.', date: '2024-07-29' },
    ],
    isPinned: true,
  },
  {
    id: 2,
    circleId: 5,
    userId: 4,
    username: 'سارة عبدالله',
    avatar: 'https://picsum.photos/106',
    title: 'سؤال عن أفضل حضانة في المدينة',
    content: 'أبحث عن أفضل حضانة للأطفال في هليوبوليس الجديدة، يا ليت أصحاب التجارب يفيدونا بآرائهم وتقييماتهم.',
    category: 'سؤال',
    date: '2024-07-27',
    likes: [1, 5],
    comments: [],
  },
  {
    id: 3,
    circleId: 1,
    userId: 5,
    username: 'محمد حسين',
    avatar: 'https://picsum.photos/200/200?random=5',
    title: 'أنشطة للأطفال',
    content: 'ما هي أفضل الأنشطة للأطفال في سن 8-12 سنة في المدينة؟ ابني يشعر بالملل وأبحث عن اقتراحات.',
    category: 'سؤال',
    date: '2024-07-26',
    likes: [2],
    comments: [
       { id: 103, userId: 1, username: 'أحمد محمود', avatar: 'https://picsum.photos/101', content: 'جرب النادي الاجتماعي الجديد، به أنشطة رياضية ممتازة.', date: '2024-07-26' },
    ]
  },
  {
    id: 4,
    circleId: 5,
    userId: 2,
    username: 'فاطمة الزهراء',
    avatar: 'https://picsum.photos/102',
    title: 'ما هو أفضل مزود خدمة إنترنت في المدينة؟',
    content: 'أفكر في الاشتراك في خدمة إنترنت جديدة وأريد أن أعرف تجاربكم مع الشركات المختلفة.',
    category: 'استطلاع رأي',
    date: '2024-07-30',
    likes: [1, 5, 3],
    comments: [],
    pollOptions: [
        { option: 'WE ( المصرية للاتصالات )', votes: [1, 5] },
        { option: 'Orange', votes: [3] },
        { option: 'Vodafone', votes: [] },
        { option: 'Etisalat', votes: [4] },
    ]
  }
];

export const mockMarketplaceItems: MarketplaceItem[] = [
    {
        id: 1,
        userId: 1,
        username: 'أحمد محمود',
        avatar: 'https://picsum.photos/101',
        title: 'لابتوب مستعمل بحالة ممتازة',
        description: 'لابتوب Dell Inspiron 15, Core i5, 8GB RAM, 256GB SSD. استخدام خفيف لمدة سنة. لا يوجد به أي خدوش.',
        images: ['https://picsum.photos/800/600?random=201', 'https://picsum.photos/800/600?random=202'],
        price: 8500,
        category: 'إلكترونيات',
        contactPhone: '01001234567',
        status: 'approved',
        creationDate: '2024-07-28',
        expirationDate: '2024-08-28',
    },
    {
        id: 2,
        userId: 2,
        username: 'فاطمة الزهراء',
        avatar: 'https://picsum.photos/102',
        title: 'أثاث غرفة معيشة للبيع',
        description: 'كنبة ٣ مقاعد وكرسيين. بحالة جيدة جداً. اللون بيج.',
        images: ['https://picsum.photos/800/600?random=203'],
        price: 5000,
        category: 'أثاث',
        contactPhone: '01119876543',
        status: 'pending',
        creationDate: '2024-07-29',
        expirationDate: '2024-08-29',
    },
    {
        id: 3,
        userId: 5,
        username: 'محمد حسين',
        avatar: 'https://picsum.photos/200/200?random=5',
        title: 'سيارة للبيع',
        description: 'هيونداي النترا 2018. عداد 80 ألف كيلو. فابريكة بالكامل.',
        images: ['https://picsum.photos/800/600?random=204'],
        price: 350000,
        category: 'سيارات',
        contactPhone: '01223344556',
        status: 'rejected',
        rejectionReason: 'الصور غير واضحة',
        creationDate: '2024-07-25',
        expirationDate: '2024-08-25',
    },
];

export const mockJobPostings: JobPosting[] = [
    {
        id: 1,
        userId: 3,
        username: 'خالد العتيبي',
        avatar: 'https://picsum.photos/103',
        title: 'مطلوب محاسب',
        companyName: 'شركة النور للتجارة',
        description: 'مطلوب محاسب خبرة من 2-4 سنوات. يجيد التعامل مع برامج المحاسبة. مقر الشركة في هليوبوليس الجديدة.',
        location: 'هليوبوليس الجديدة',
        type: 'دوام كامل',
        contactInfo: 'hr@elnour.com',
        status: 'approved',
        creationDate: '2024-07-27',
        expirationDate: '2024-08-27',
    },
    {
        id: 2,
        userId: 4,
        username: 'سارة عبدالله',
        avatar: 'https://picsum.photos/106',
        title: 'مدرس لغة إنجليزية',
        companyName: 'مركز تعليمي',
        description: 'مطلوب مدرس لغة إنجليزية للمرحلة الإعدادية. العمل بدوام جزئي مسائي.',
        location: 'هليوبوليس الجديدة',
        type: 'دوام جزئي',
        contactInfo: '01001122334',
        status: 'pending',
        creationDate: '2024-07-29',
        expirationDate: '2024-08-29',
    },
];

export const mockLostAndFoundItems: LostAndFoundItem[] = [
    {
        id: 1,
        userId: 1,
        username: 'أحمد محمود',