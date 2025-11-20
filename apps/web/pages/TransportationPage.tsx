
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransportation, useAuth } from '@helio/shared-logic';
import type { Driver, ExternalRoute, Supervisor, WeeklyScheduleItem } from '@helio/shared-logic';
import { ArrowLeftIcon, PlusIcon, PencilSquareIcon, TrashIcon, BusIcon, UserCircleIcon, MapIcon, CalendarDaysIcon } from '../components/common/Icons';
import Modal from '../components/common/Modal';
import ImageUploader from '../components/common/ImageUploader';
import { InputField } from '../components/common/FormControls';

// Form for editing a supervisor
const SupervisorForm: React.FC<{ supervisor: Supervisor; onSave: (supervisor: Supervisor) => void; onClose: () => void }> = ({ supervisor, onSave, onClose }) => {
    const [name, setName] = useState(supervisor.name);
    const [phone, setPhone] = useState(supervisor.phone);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, phone });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="name" label="الاسم" value={name} onChange={e => setName(e.target.value)} required />
            <InputField name="phone" label="رقم الهاتف" value={phone} onChange={e => setPhone(e.target.value)} required />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md">حفظ</button>
            </div>
        </form>
    );
};

// Form for adding/editing a driver
const DriverForm: React.FC<{ driver: Driver | null; onSave: (driver: Omit<Driver, 'id'> & { id?: number }) => void; onClose: () => void }> = ({ driver, onSave, onClose }) => {
    const [name, setName] = useState(driver?.name || '');
    const [phone, setPhone] = useState(driver?.phone || '');
    const [avatar, setAvatar] = useState(driver?.avatar ? [driver.avatar] : []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: driver?.id, name, phone, avatar: avatar[0] || `https://picsum.photos/200/200?random=${Date.now()}` });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="name" label="الاسم" value={name} onChange={e => setName(e.target.value)} required />
            <InputField name="phone" label="رقم الهاتف" value={phone} onChange={e => setPhone(e.target.value)} required />
            <ImageUploader initialImages={avatar} onImagesChange={setAvatar} multiple={false} label="صورة السائق" />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md">حفظ</button>
            </div>
        </form>
    );
};

// Form for adding/editing an external route
const RouteForm: React.FC<{ route: ExternalRoute | null; onSave: (route: Omit<ExternalRoute, 'id'> & { id?: number }) => void; onClose: () => void; }> = ({ route, onSave, onClose }) => {
    const [name, setName] = useState(route?.name || '');
    const [timings, setTimings] = useState(route?.timings.join(', ') || '');
    const [waitingPoint, setWaitingPoint] = useState(route?.waitingPoint || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: route?.id, name, timings: timings.split(',').map(t => t.trim()), waitingPoint });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="name" label="اسم المسار" value={name} onChange={e => setName(e.target.value)} required />
            <InputField name="timings" label="المواعيد (مفصولة بفاصلة)" value={timings} onChange={e => setTimings(e.target.value)} required />
            <InputField name="waitingPoint" label="نقطة الانتظار" value={waitingPoint} onChange={e => setWaitingPoint(e.target.value)} required />
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md">حفظ</button>
            </div>
        </form>
    );
};


const TransportationPage: React.FC = () => {
    const navigate = useNavigate();
    const { transportation, handleSaveSupervisor, handleSaveDriver, handleDeleteDriver, handleSaveRoute, handleDeleteRoute, handleSaveSchedule } = useTransportation();
    const { hasPermission } = useAuth();
    const canManage = hasPermission(['مسؤول الباصات']);

    const [modal, setModal] = useState< 'supervisor' | 'driver' | 'route' | null >(null);
    const [editingSupervisor, setEditingSupervisor] = useState<{ type: 'internal' | 'external', data: Supervisor } | null>(null);
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
    const [editingRoute, setEditingRoute] = useState<ExternalRoute | null>(null);

    return (
         <div className="animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 rtl:space-x-reverse text-cyan-500 dark:text-cyan-400 hover:underline mb-6">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة</span>
            </button>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3"><BusIcon className="w-8 h-8"/>إدارة النقل والمواصلات</h1>
                
                {/* Sections */}
                <div className="space-y-8">
                    {/* Supervisors */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">المشرفون</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Card for internal supervisor */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{transportation.internalSupervisor.name}</p>
                                    <p className="text-sm text-gray-500">مشرف داخلي - {transportation.internalSupervisor.phone}</p>
                                </div>
                                {canManage && <button onClick={() => { setEditingSupervisor({ type: 'internal', data: transportation.internalSupervisor }); setModal('supervisor');}} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><PencilSquareIcon className="w-5 h-5"/></button>}
                            </div>
                            {/* Card for external supervisor */}
                             <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{transportation.externalSupervisor.name}</p>
                                    <p className="text-sm text-gray-500">مشرف خارجي - {transportation.externalSupervisor.phone}</p>
                                </div>
                                {canManage && <button onClick={() => { setEditingSupervisor({ type: 'external', data: transportation.externalSupervisor }); setModal('supervisor');}} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"><PencilSquareIcon className="w-5 h-5"/></button>}
                            </div>
                        </div>
                    </section>
                    
                    {/* Drivers */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                             <h2 className="text-xl font-semibold">السائقون (داخلي)</h2>
                             {canManage && <button onClick={() => { setEditingDriver(null); setModal('driver');}} className="flex items-center gap-2 bg-cyan-500 text-white text-sm font-semibold px-3 py-1.5 rounded-lg"><PlusIcon className="w-4 h-4"/>إضافة</button>}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                {/* ... table for drivers ... */}
                            </table>
                        </div>
                    </section>
                </div>
            </div>
         </div>
    );
};

export default TransportationPage;
