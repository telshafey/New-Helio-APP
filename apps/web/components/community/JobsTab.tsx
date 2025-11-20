import React, { useState, useMemo } from 'react';
import { useCommunity } from '@helio/shared-logic';
import type { JobPosting } from '@helio/shared-logic';
import { BriefcaseIcon, MagnifyingGlassIcon, MapPinIcon } from '../common/Icons';
import EmptyState from '../common/EmptyState';

const JobPostingCard: React.FC<{ job: JobPosting }> = ({ job }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-transparent hover:border-cyan-500/50 transition-all duration-300">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{job.title}</h3>
                <p className="font-semibold">{job.companyName}</p>
            </div>
            <span className="bg-slate-100 dark:bg-slate-700 text-xs px-2 py-1 rounded-full">{job.type}</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm my-3 h-16 overflow-hidden">{job.description}</p>
        <div className="flex justify-between items-center text-sm pt-3 border-t border-slate-200 dark:border-slate-700">
            <p className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {job.location}</p>
            <p className="font-mono text-xs">{new Date(job.creationDate).toLocaleDateString('ar-EG-u-nu-latn')}</p>
        </div>
    </div>
);

const JobsTab: React.FC = () => {
    const { jobPostings } = useCommunity();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedJobs = useMemo(() => {
        return jobPostings
            .filter(job => job.status === 'approved')
            .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [jobPostings, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="relative flex-grow">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2" />
                <input type="text" placeholder="ابحث عن وظيفة أو شركة..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white dark:bg-slate-700 rounded-lg py-2 pr-10 pl-4 focus:outline-none"/>
            </div>

            {approvedJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {approvedJobs.map(job => <JobPostingCard key={job.id} job={job} />)}
                </div>
            ) : (
                <div className="mt-10">
                    <EmptyState icon={<BriefcaseIcon className="w-16 h-16 text-slate-400" />} title="لا توجد وظائف متاحة حالياً" message="سيتم عرض الوظائف هنا عند توفرها." />
                </div>
            )}
        </div>
    );
};

export default JobsTab;