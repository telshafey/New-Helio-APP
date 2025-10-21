import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// FIX: Corrected import paths for monorepo structure
import { useUsers } from '../../../packages/shared-logic/context/UsersContext';
import { useAuth } from '../../../packages/shared-logic/context/AuthContext';
import type { PostCategory, Circle } from '../../../packages/shared-logic/types';
import { 
    PlusIcon, ChatBubbleOvalLeftEllipsisIcon, UsersIcon, TrashIcon, 
    ShoppingBagIcon, BriefcaseIcon, ArchiveBoxIcon
} from '../components/common/Icons';
import Modal from '../components/common/Modal';
import PageBanner from '../components/common/PageBanner';
// FIX: Corrected import paths for monorepo structure
import { useCommunity } from '../../../packages/shared-logic/context/AppContext';
import { useNews } from '../../../packages/shared-logic/context/NewsContext';
import AdSlider from '../components/common/AdSlider';
import { InputField, TextareaField } from '../components/common/FormControls';
import ImageUploader from '../components/common/ImageUploader';

// Import newly created tab components
import CommunityFeedTab from '../components/community/CommunityFeedTab';
import MarketplaceTab from '../components/community/MarketplaceTab';
import JobsTab from '../components/community/JobsTab';
import LostAndFoundTab from '../components/community/LostAndFoundTab';

// --- FORMS (kept here as they are opened from this page's context) ---

const NewPostForm: React.FC<{ onClose: () => void; circleId: number }> = ({ onClose, circleId }) => {
    const { addPost } = useCommunity();
    const [category, setCategory] = useState<PostCategory>('نقاش');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);

    const handlePollOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => setPollOptions([...pollOptions, '']);
    const removePollOption = (index: number) => setPollOptions(pollOptions.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && category !== 'استطلاع رأي') return;
        
        let postData: any = { category, title: title.trim() || undefined, content, circleId };
        
        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => ({ option: opt.trim(), votes: [] })).filter(opt => opt.option);
            if (validOptions.length < 2) {
                alert('يجب أن يحتوي الاستطلاع على خيارين على الأقل.');
                return;
            }
            postData.pollOptions = validOptions;
        }

        addPost(postData);
        onClose();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">نوع المنشور</label>
                <select value={category} onChange={e => setCategory(e.target.value as PostCategory)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2">
                    {postCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{category === 'استطلاع رأي' ? 'السؤال الرئيسي للاستطلاع' : 'العنوان (اختياري)'}</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={category === 'استطلاع رأي' ? 'ما هو سؤالك؟' : 'مثال: تجمع ملاك الحي الأول'} required={category === 'استطلاع رأي'} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">المحتوى</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} required rows={4} placeholder="اكتب ما يدور في ذهنك..." className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2"></textarea>
            </div>
            
            {category === 'استطلاع رأي' && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium">خيارات الاستطلاع</label>
                    {pollOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="text" value={option} onChange={e => handlePollOptionChange(index, e.target.value)} placeholder={`خيار ${index + 1}`} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
                            {pollOptions.length > 2 && <button type="button" onClick={() => removePollOption(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4"/></button>}
                        </div>
                    ))}
                    <button type="button" onClick={addPollOption} className="text-sm text-cyan-600 font-semibold flex items-center gap-1"><PlusIcon className="w-4 h-4"/>إضافة خيار</button>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">نشر</button>
            </div>
        </form>
    );
};

const AddItemForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handleSaveMarketplaceItem } = useCommunity();
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', category: '', contactPhone: '', duration: 30,
    });
    const [images, setImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            alert('يرجى إضافة صورة واحدة على الأقل.');
            return;
        }
        handleSaveMarketplaceItem({
            ...formData,
            price: parseFloat(formData.price) || 0,
            images,
            duration: Number(formData.duration),
        });
        onClose();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader initialImages={images} onImagesChange={setImages} multiple maxFiles={5} label="صور المنتج" />
            <InputField name="title" label="عنوان الإعلان" value={formData.title} onChange={handleChange} required />
            <TextareaField name="description" label="الوصف" value={formData.description} onChange={handleChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="price" label="السعر (بالجنيه)" type="number" value={formData.price} onChange={handleChange} required />
                <InputField name="category" label="الفئة" value={formData.category} onChange={handleChange} required placeholder="مثال: أثاث, إلكترونيات..."/>
            </div>
            <InputField name="contactPhone" label="رقم هاتف للتواصل" value={formData.contactPhone} onChange={handleChange} required />
            <div>
                <label className="block text-sm font-medium mb-1">مدة عرض الإعلان</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    <option value={30}>30 يوم</option>
                    <option value={60}>60 يوم</option>
                    <option value={90}>90 يوم</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
            </div>
        </form>
    );
};

const AddJobForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handleSaveJobPosting } = useCommunity();
    const [formData, setFormData] = useState({
        title: '', companyName: '', description: '', location: 'هليوبوليس الجديدة',
        type: 'دوام كامل' as 'دوام كامل' | 'دوام جزئي' | 'عقد' | 'تدريب', contactInfo: '', duration: 30,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveJobPosting({
            ...formData,
            type: formData.type as any,
            duration: Number(formData.duration),
        });
        onClose();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="title" label="المسمى الوظيفي" value={formData.title} onChange={handleChange} required />
            <InputField name="companyName" label="اسم الشركة" value={formData.companyName} onChange={handleChange} required />
            <TextareaField name="description" label="وصف الوظيفة" value={formData.description} onChange={handleChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="location" label="الموقع" value={formData.location} onChange={handleChange} required />
                <div>
                    <label className="block text-sm font-medium mb-1">نوع الدوام</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                        <option value="دوام كامل">دوام كامل</option>
                        <option value="دوام جزئي">دوام جزئي</option>
                        <option value="عقد">عقد</option>
                        <option value="تدريب">تدريب</option>
                    </select>
                </div>
            </div>
            <InputField name="contactInfo" label="معلومات التواصل (بريد إلكتروني أو هاتف)" value={formData.contactInfo} onChange={handleChange} required />
            <div>
                <label className="block text-sm font-medium mb-1">مدة عرض الإعلان</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    <option value={30}>30 يوم</option>
                    <option value={60}>60 يوم</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
            </div>
        </form>
    );
};

const AddLostAndFoundForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handleSaveLostAndFoundItem } = useCommunity();
    const [formData, setFormData] = useState({
        type: 'lost' as 'lost' | 'found',
        title: '',
        description: '',
        location: '',
        contactInfo: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [image, setImage] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveLostAndFoundItem({
            ...formData,
            imageUrl: image[0] || undefined,
        });
        onClose();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">نوع البلاغ</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    <option value="lost">مفقود</option>
                    <option value="found">تم العثور عليه</option>
                </select>
            </div>
            <InputField name="title" label="العنوان" value={formData.title} onChange={handleChange} required placeholder={formData.type === 'lost' ? 'مثال: فقدت مفاتيح سيارتي' : 'مثال: وجدت هاتف محمول'} />
            <TextareaField name="description" label="الوصف" value={formData.description} onChange={handleChange} required />
            <ImageUploader initialImages={image} onImagesChange={setImage} multiple={false} label="صورة (اختياري)" />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="location" label="الموقع التقريبي" value={formData.location} onChange={handleChange} required placeholder="مثال: الحديقة المركزية"/>
                <InputField name="date" label="تاريخ الفقد/العثور" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            <InputField name="contactInfo" label="معلومات التواصل (هاتف أو بريد إلكتروني)" value={formData.contactInfo} onChange={handleChange} required />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
            </div>
        </form>
    );
};


// --- MAIN COMMUNITY PAGE ---
const CommunityPage: React.FC = () => {
    const { users } = useUsers();
    const { posts, circles } = useCommunity();
    const { isPublicAuthenticated, currentPublicUser } = useAuth();
    const { advertisements } = useNews();
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState<'feed' | 'marketplace' | 'jobs' | 'lost-and-found'>('feed');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState(false);
    const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);
    const [isLostAndFoundModalOpen, setIsLostAndFoundModalOpen] = useState(false);
    const [activeCircleId, setActiveCircleId] = useState<number>(1);

    const sliderAds = React.useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return advertisements.filter(ad => {
            const start = new Date(ad.startDate);
            const end = new Date(ad.endDate);
            return today >= start && today <= end;
        });
    }, [advertisements]);
    
    const handleSidebarButtonClick = () => {
        if (!isPublicAuthenticated) {
            navigate('/login-user');
            return;
        }
        if (activeTab === 'feed') setIsPostModalOpen(true);
        else if (activeTab === 'marketplace') setIsMarketplaceModalOpen(true);
        else if (activeTab === 'jobs') setIsJobsModalOpen(true);
        else if (activeTab === 'lost-and-found') setIsLostAndFoundModalOpen(true);
    };

    const getSidebarButtonText = () => {
        switch (activeTab) {
            case 'marketplace': return 'أضف إعلانك';
            case 'jobs': return 'أضف وظيفة';
            case 'lost-and-found': return 'أضف بلاغاً';
            case 'feed':
            default: return 'أضف منشوراً جديداً';
        }
    };

    const TabButton: React.FC<{ tabId: 'feed' | 'marketplace' | 'jobs' | 'lost-and-found', title: string, icon: React.ReactNode }> = ({ tabId, title, icon }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 font-semibold rounded-t-lg transition-colors focus:outline-none text-sm ${
                activeTab === tabId
                    ? 'bg-white dark:bg-slate-800 text-cyan-500 border-b-2 border-cyan-500'
                    : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
        >
            {icon}
            {title}
        </button>
    );

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen animate-fade-in" dir="rtl">
            <PageBanner
                title="مجتمع هليوبوليس"
                subtitle="شارك، تواصل، وكن جزءاً من مجتمع حيوي."
                icon={<ChatBubbleOvalLeftEllipsisIcon className="w-12 h-12 text-teal-500" />}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sliderAds.length > 0 && (
                    <div className="mb-8">
                        <AdSlider ads={sliderAds} />
                    </div>
                )}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Feed */}
                    <main className="w-full lg:w-8/12 xl:w-9/12">
                         <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                            <div className="overflow-x-auto scrollbar-hide">
                                <nav className="-mb-px flex gap-2 whitespace-nowrap" aria-label="Tabs">
                                    <TabButton tabId="feed" title="المنشورات" icon={<ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="marketplace" title="البيع والشراء" icon={<ShoppingBagIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="jobs" title="الوظائف" icon={<BriefcaseIcon className="w-5 h-5"/>} />
                                    <TabButton tabId="lost-and-found" title="المفقودات" icon={<ArchiveBoxIcon className="w-5 h-5"/>} />
                                </nav>
                            </div>
                        </div>

                        {activeTab === 'feed' && <CommunityFeedTab posts={posts} circles={circles} />}
                        {activeTab === 'marketplace' && <MarketplaceTab />}
                        {activeTab === 'jobs' && <JobsTab />}
                        {activeTab === 'lost-and-found' && <LostAndFoundTab />}
                    </main>
                    
                    {/* Sidebar */}
                    <aside className="w-full lg:w-4/12 xl:w-3/12 space-y-6">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg text-center">
                            {currentPublicUser ? (
                                <>
                                    <img src={currentPublicUser.avatar} alt={currentPublicUser.name} className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-cyan-500/50" />
                                    <h3 className="mt-4 text-xl font-bold">مرحباً، {currentPublicUser.name}!</h3>
                                </>
                            ) : (
                                <h3 className="text-xl font-bold">مرحباً في مجتمع هليوبوليس</h3>
                            )}
                             <div className="mt-4 flex justify-around text-sm">
                                <div className="text-gray-500 dark:text-gray-400"><strong className="block text-lg text-gray-800 dark:text-white">{posts.length}</strong> منشور</div>
                                <div className="text-gray-500 dark:text-gray-400"><strong className="block text-lg text-gray-800 dark:text-white">{users.length}</strong> عضو</div>
                            </div>
                             <button onClick={handleSidebarButtonClick} className="w-full mt-6 flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-cyan-600 transition-transform hover:scale-105">
                                <PlusIcon className="w-5 h-5"/>
                                <span>{getSidebarButtonText()}</span>
                            </button>
                        </div>

                         <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><UsersIcon className="w-5 h-5"/> الدوائر</h3>
                            <div className="space-y-2">
                                {circles.map(circle => (
                                    <button key={circle.id} onClick={() => setActiveCircleId(circle.id)} className={`w-full text-right p-3 rounded-md font-semibold transition ${activeCircleId === circle.id ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        {circle.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} title="إنشاء منشور جديد">
                    <NewPostForm onClose={() => setIsPostModalOpen(false)} circleId={activeCircleId} />
                </Modal>
                <Modal isOpen={isMarketplaceModalOpen} onClose={() => setIsMarketplaceModalOpen(false)} title="إضافة إعلان جديد">
                    <AddItemForm onClose={() => setIsMarketplaceModalOpen(false)} />
                </Modal>
                <Modal isOpen={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} title="إضافة إعلان وظيفة">
                    <AddJobForm onClose={() => setIsJobsModalOpen(false)} />
                </Modal>
                <Modal isOpen={isLostAndFoundModalOpen} onClose={() => setIsLostAndFoundModalOpen(false)} title="إضافة بلاغ جديد">
                    <AddLostAndFoundForm onClose={() => setIsLostAndFoundModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
};

export default CommunityPage;