import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// FIX: Corrected import paths for monorepo structure.
import { useAuth } from '../../../packages/shared-logic/src/context/AuthContext';
import { useCommunity } from '../../../packages/shared-logic/src/context/AppContext';
import type { Post, PostCategory, Circle } from '../../../packages/shared-logic/src/types';
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon, PinIcon } from '../common/Icons';
import EmptyState from '../common/EmptyState';

const PollInCard: React.FC<{ post: Post }> = ({ post }) => {
    const { voteOnPoll } = useCommunity();
    const { currentPublicUser } = useAuth();
    const navigate = useNavigate();

    const { totalVotes, userVoteIndex } = useMemo(() => {
        if (!post.pollOptions) return { totalVotes: 0, userVoteIndex: -1 };
        const allVoters = new Set<number>();
        let voteIndex = -1;
        post.pollOptions.forEach((opt, index) => {
            opt.votes.forEach(voterId => {
                allVoters.add(voterId);
                if (currentPublicUser && voterId === currentPublicUser.id) {
                    voteIndex = index;
                }
            });
        });
        return { totalVotes: allVoters.size, userVoteIndex: voteIndex };
    }, [post.pollOptions, currentPublicUser]);
    
    const hasVoted = userVoteIndex > -1;

    const handleVote = (e: React.MouseEvent, optionIndex: number) => {
        e.stopPropagation();
        e.preventDefault();
        if (!currentPublicUser) {
            navigate('/login-user');
            return;
        }
        voteOnPoll(post.id, optionIndex);
    };

    if (!post.pollOptions) return null;

    return (
        <div className="mt-4 space-y-3">
            {hasVoted ? (
                // Results View
                post.pollOptions.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
                    const isUserChoice = index === userVoteIndex;
                    return (
                        <div key={index} className={`p-2 border-2 rounded-lg ${isUserChoice ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30' : 'border-slate-200 dark:border-slate-700'}`}>
                            <div className="flex justify-between items-center font-semibold text-sm mb-1">
                                <span className={isUserChoice ? 'text-cyan-700 dark:text-cyan-300' : ''}>{option.option}</span>
                                <span>{Math.round(percentage)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })
            ) : (
                // Voting View
                post.pollOptions.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={(e) => handleVote(e, index)}
                        className="w-full text-right p-3 font-semibold bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/50 border border-transparent hover:border-cyan-400 transition"
                    >
                        {option.option}
                    </button>
                ))
            )}
        </div>
    );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const { toggleLikePost } = useCommunity();
    const { currentPublicUser } = useAuth();
    const isLiked = currentPublicUser ? post.likes.includes(currentPublicUser.id) : false;

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(!currentPublicUser) return;
        toggleLikePost(post.id);
    };

    return (
        <Link to={`/post/${post.id}`} className={`block bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${post.isPinned ? 'ring-2 ring-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`}>
            {post.isPinned && (
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                    <PinIcon className="w-5 h-5"/>
                    <span>مثبت</span>
                </div>
            )}
            <div className="flex items-center gap-4 mb-4">
                <img src={post.avatar} alt={post.username} className="w-12 h-12 rounded-full object-cover" loading="lazy" decoding="async" />
                <div>
                    <p className="font-bold text-gray-800 dark:text-white">{post.username}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center flex-wrap">
                        <span>{new Date(post.date).toLocaleDateString('ar-EG-u-nu-latn')}</span>
                        <span className="mx-1.5">•</span>
                        <span className="font-semibold text-cyan-500">{post.category}</span>
                    </p>
                </div>
            </div>
            {post.title && <h3 className="text-lg font-bold mb-2">{post.title}</h3>}
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.content}</p>

            {post.category === 'استطلاع رأي' && <PollInCard post={post} />}
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <button onClick={handleLikeClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-100 dark:bg-red-900/50' : 'text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                    <HandThumbUpIcon className="w-5 h-5"/>
                    <span className="font-semibold">{post.likes.length}</span>
                </button>
            </div>
        </Link>
    );
};

const CommunityFeedTab: React.FC<{ posts: Post[]; circles: Circle[] }> = ({ posts, circles }) => {
    const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest');
    const [activeCircleId, setActiveCircleId] = useState<number>(1);
    const [postTypeFilter, setPostTypeFilter] = useState<PostCategory | 'all'>('all');

    const postTypesForFilter: (PostCategory | 'all')[] = ['all', 'نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    const sortedAndFilteredPosts = useMemo(() => {
        let processedPosts = posts.filter(p => p.circleId === activeCircleId);

        if (postTypeFilter !== 'all') {
            processedPosts = processedPosts.filter(p => p.category === postTypeFilter);
        }

        if (sortOrder === 'popular') {
            processedPosts.sort((a, b) => (b.likes.length + b.comments.length) - (a.likes.length + a.comments.length));
        } else {
            processedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        
        processedPosts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

        return processedPosts;
    }, [posts, sortOrder, activeCircleId, postTypeFilter]);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {postTypesForFilter.map(type => (
                        <button key={type} onClick={() => setPostTypeFilter(type)} className={`px-3 py-1 text-sm font-semibold rounded-full ${postTypeFilter === type ? 'bg-cyan-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                            {type === 'all' ? 'الكل' : type}
                        </button>
                    ))}
                </div>
                 <div className="flex items-center gap-2">
                    <label htmlFor="sortOrder" className="font-semibold text-sm">ترتيب حسب:</label>
                    <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(e.target.value as 'latest' | 'popular')} className="bg-white dark:bg-slate-800 rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="latest">الأحدث</option>
                        <option value="popular">الأكثر تفاعلاً</option>
                    </select>
                </div>
            </div>

            {sortedAndFilteredPosts.length > 0 ? (
                <div className="space-y-6">
                    {sortedAndFilteredPosts.map(post => <PostCard key={post.id} post={post} />)}
                </div>
            ) : (
                 <div className="mt-10">
                    <EmptyState
                        icon={<ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 text-slate-400" />}
                        title="لا توجد منشورات هنا"
                        message="حاول تغيير الفلاتر أو كن أول من يضيف منشوراً في هذه الدائرة!"
                    />
                 </div>
            )}
        </>
    );
};

export default CommunityFeedTab;