import React, { useState, useCallback, ReactNode } from 'react';
// FIX: Corrected import path for types from the shared logic package.
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon, InformationCircleIcon, QuestionMarkCircleIcon, BookOpenIcon, PlusIcon, TrashIcon, PencilSquareIcon, BuildingLibraryIcon } from '../components/common/Icons';
// FIX: Corrected import path for types from the shared logic package.
import type { HomePageContent, AboutPageContent, FaqPageContent, PolicyPageContent, PublicPagesContent, AboutCityPageContent, BoardMember } from '../packages/shared-logic/src/types';
import { InputField, TextareaField } from '../components/common/FormControls';

const SaveButton: React.FC<{ onClick: () => void; isSaving: boolean }> = ({ onClick, isSaving }) => (
    <button onClick={onClick} disabled={isSaving} className="px-6 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 disabled:bg-slate-400">
        {isSaving ? '...جاري الحفظ' : 'حفظ التغييرات'}
    </button>
);

// Form Components per Tab
const HomePageForm: React.FC<{ content: HomePageContent; onSave: (data: HomePageContent) => void }> = ({ content, onSave }) => {
    const [data, setData] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: keyof HomePageContent, value: string) => setData(prev => ({ ...prev, [field]: value }));
    const handleFeatureChange = (index: number, field: keyof typeof data.features[0], value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleSaveClick = () => {
        setIsSaving(true);
        onSave(data);
        setTimeout(() => setIsSaving(false), 1000); // Simulate save
    };
    
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">محتوى الصفحة الرئيسية</h3>
            <InputField name="heroTitleLine1" label="العنوان الرئيسي (سطر 1)" value={data.heroTitleLine1} onChange={e => handleChange('heroTitleLine1', e.target.value)} />
            <InputField name="heroTitleLine2" label="العنوان الرئيسي (سطر 2)" value={data.heroTitleLine2} onChange={e => handleChange('heroTitleLine2', e.target.value)} />
            <TextareaField name="heroSubtitle" label="النص التعريفي" value={data.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} />
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-2">قسم المميزات</h3>
                <InputField name="featuresSectionTitle" label="عنوان القسم" value={data.featuresSectionTitle} onChange={e => handleChange('featuresSectionTitle', e.target.value)} />
                <TextareaField name="featuresSectionSubtitle" label="الوصف" value={data.featuresSectionSubtitle} onChange={e => handleChange('featuresSectionSubtitle', e.target.value)} />
                {data.features.map((feature, index) => (
                    <div key={index} className="p-4 border rounded-md mt-2 bg-slate-50 dark:bg-slate-700/50">
                        <InputField name={`feature_title_${index}`} label={`الميزة ${index + 1}: العنوان`} value={feature.title} onChange={e => handleFeatureChange(index, 'title', e.target.value)} />
                        <TextareaField name={`feature_desc_${index}`} label={`الميزة ${index + 1}: الوصف`} value={feature.description} onChange={e => handleFeatureChange(index, 'description', e.target.value)} />
                    </div>
                ))}
            </div>
             <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                 <h3 className="text-lg font-semibold mb-2">قسم الروابط</h3>
                 <InputField name="infoLinksSectionTitle" label="عنوان القسم" value={data.infoLinksSectionTitle} onChange={e => handleChange('infoLinksSectionTitle', e.target.value)} />
            </div>
            <div className="flex justify-end pt-4"><SaveButton onClick={handleSaveClick} isSaving={isSaving} /></div>
        </div>
    );
};

const AboutPageForm: React.FC<{ content: AboutPageContent; onSave: (data: AboutPageContent) => void }> = ({ content, onSave }) => {
    const [data, setData] = useState(content);
    const [isSaving, setIsSaving] = useState(false);
    
    const handleSaveClick = () => {
        setIsSaving(true);
        onSave(data);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">محتوى صفحة "حول التطبيق"</h3>
            <InputField name="about_title" label="العنوان" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
            <TextareaField name="about_intro" label="المقدمة" value={data.intro} onChange={e => setData(d => ({ ...d, intro: e.target.value }))} rows={5} />
            <InputField name="about_vision_title" label="عنوان الرؤية" value={data.vision.title} onChange={e => setData(d => ({ ...d, vision: {...d.vision, title: e.target.value }}))} />
            <TextareaField name="about_vision_text" label="نص الرؤية" value={data.vision.text} onChange={e => setData(d => ({ ...d, vision: { ...d.vision, text: e.target.value }}))} />
            <InputField name="about_mission_title" label="عنوان المهمة" value={data.mission.title} onChange={e => setData(d => ({ ...d, mission: {...d.mission, title: e.target.value }}))} />
            <TextareaField name="about_mission_text" label="نص المهمة" value={data.mission.text} onChange={e => setData(d => ({ ...d, mission: { ...d.mission, text: e.target.value } }))} />
            <div className="flex justify-end pt-4"><SaveButton onClick={handleSaveClick} isSaving={isSaving} /></div>
        </div>
    );
};

const FaqPageForm: React.FC<{ content: FaqPageContent; onSave: (data: FaqPageContent) => void }> = ({ content, onSave }) => {
    const [data, setData] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    const handleItemChange = (catIndex: number, itemIndex: number, field: 'q' | 'a', value: string) => {
        const newData = { ...data };
        newData.categories[catIndex].items[itemIndex][field] = value;
        setData(newData);
    };
    
    const addItem = (catIndex: number) => {
        const newData = { ...data };
        newData.categories[catIndex].items.push({ q: '', a: '' });
        setData(newData);
    };
    
    const removeItem = (catIndex: number, itemIndex: number) => {
        const newData = { ...data };
        newData.categories[catIndex].items.splice(itemIndex, 1);
        setData(newData);
    };

    const handleSaveClick = () => {
        setIsSaving(true);
        onSave(data);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">محتوى صفحة الأسئلة الشائعة</h3>
            <InputField name="faq_title" label="العنوان الرئيسي" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
            <TextareaField name="faq_subtitle" label="العنوان الفرعي" value={data.subtitle} onChange={e => setData(d => ({ ...d, subtitle: e.target.value }))} />
            
            {data.categories.map((cat, catIndex) => (
                <div key={catIndex} className="p-4 border rounded-md mt-4 bg-slate-50 dark:bg-slate-700/50">
                    <InputField name={`cat_title_${catIndex}`} label={`عنوان الفئة ${catIndex + 1}`} value={cat.category} onChange={e => {
                        const newData = {...data};
                        newData.categories[catIndex].category = e.target.value;
                        setData(newData);
                    }}/>
                    {cat.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 border rounded-md mt-2 bg-white dark:bg-slate-800 relative">
                            <button type="button" onClick={() => removeItem(catIndex, itemIndex)} className="absolute top-2 left-2 p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4"/></button>
                            <InputField name={`item_q_${catIndex}_${itemIndex}`} label={`السؤال ${itemIndex + 1}`} value={item.q} onChange={e => handleItemChange(catIndex, itemIndex, 'q', e.target.value)} />
                            <TextareaField name={`item_a_${catIndex}_${itemIndex}`} label={`الإجابة ${itemIndex + 1}`} value={item.a} onChange={e => handleItemChange(catIndex, itemIndex, 'a', e.target.value)} />
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem(catIndex)} className="mt-2 text-sm text-cyan-600 font-semibold flex items-center gap-1"><PlusIcon className="w-4 h-4"/>إضافة سؤال</button>
                </div>
            ))}
             <div className="flex justify-end pt-4"><SaveButton onClick={handleSaveClick} isSaving={isSaving} /></div>
        </div>
    );
};

const PolicyPageForm: React.FC<{ content: PolicyPageContent; onSave: (data: PolicyPageContent) => void; pageTitle: string }> = ({ content, onSave, pageTitle }) => {
    const [data, setData] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveClick = () => {
        setIsSaving(true);
        onSave(data);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">محتوى صفحة "{pageTitle}"</h3>
            <InputField name="policy_title" label="العنوان" value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
            <InputField name="policy_lastUpdated" label="آخر تحديث" value={data.lastUpdated} onChange={e => setData(d => ({ ...d, lastUpdated: e.target.value }))} />
            {/* Simple textarea for sections to avoid complex dynamic fields for now */}
            <TextareaField 
                name="policy_sections" 
                label="المحتوى (JSON)"
                value={JSON.stringify(data.sections, null, 2)} 
                onChange={e => {
                    try {
                        const sections = JSON.parse(e.target.value);
                        setData(d => ({...d, sections}));
                    } catch (err) {
                        console.error("Invalid JSON for policy sections");
                    }
                }}
                rows={20}
            />
            <div className="flex justify-end pt-4"><SaveButton onClick={handleSaveClick} isSaving={isSaving} /></div>
        </div>
    )
};

const AboutCityPageForm: React.FC<{ content: AboutCityPageContent; onSave: (data: AboutCityPageContent) => void; }> = ({ content, onSave }) => {
    const [data, setData] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveClick = () => {
        setIsSaving(true);
        onSave(data);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
             <h3 className="text-xl font-bold">محتوى صفحة "عن المدينة والشركة"</h3>
             <TextareaField name="city_main_p" label="فقرات المدينة الرئيسية" value={data.city.mainParagraphs.join('\n\n')} onChange={e => setData(d => ({...d, city: {...d.city, mainParagraphs: e.target.value.split('\n\n')}}))} rows={5} />
             <TextareaField name="city_planning" label="تخطيط المدينة" value={data.city.planning} onChange={e => setData(d => ({...d, city: {...d.city, planning: e.target.value}}))} />
             <TextareaField name="city_roads" label="الطرق والمواصلات" value={data.city.roads} onChange={e => setData(d => ({...d, city: {...d.city, roads: e.target.value}}))} />
             <TextareaField name="city_utilities" label="المرافق" value={data.city.utilities} onChange={e => setData(d => ({...d, city: {...d.city, utilities: e.target.value}}))} />
            
             <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-2">محتوى الشركة</h3>
                <TextareaField name="company_about" label="نبذة عن الشركة" value={data.company.about} onChange={e => setData(d => ({...d, company: {...d.company, about: e.target.value}}))} />
                <TextareaField name="company_vision" label="الرؤية" value={data.company.vision} onChange={e => setData(d => ({...d, company: {...d.company, vision: e.target.value}}))} />
                <TextareaField name="company_mission" label="الرسالة" value={data.company.mission} onChange={e => setData(d => ({...d, company: {...d.company, mission: e.target.value}}))} />
             </div>
            <div className="flex justify-end pt-4"><SaveButton onClick={handleSaveClick} isSaving={isSaving} /></div>
        </div>
    )
};

const TabButton: React.FC<{
    tab: keyof PublicPagesContent;
    activeTab: keyof PublicPagesContent;
    onClick: (tab: keyof PublicPagesContent) => void;
    children: ReactNode;
