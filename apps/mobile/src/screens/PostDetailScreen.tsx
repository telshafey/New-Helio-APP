import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useCommunity } from '../../../../packages/shared-logic/src/context/AppContext';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import type { Post, Comment } from '../../../../packages/shared-logic/src/types';
import { HandThumbUpIcon, ChatBubbleOvalLeftEllipsisIcon, TrashIcon, ArrowUturnLeftIcon } from '../components/Icons';
import PollDisplay from '../components/community/PollDisplay';
import ShareButton from '../components/common/ShareButton'; // Assuming a native ShareButton exists

type CommunityStackParamList = {
    PostDetail: { postId: number };
};
type ScreenRouteProp = RouteProp<CommunityStackParamList, 'PostDetail'>;

const PostDetailScreen = () => {
    const route = useRoute<ScreenRouteProp>();
    const navigation = useNavigation();
    const { posts, addComment, toggleLikePost, deleteComment } = useCommunity();
    const { currentPublicUser, isPublicAuthenticated } = useAuth();
    const [comment, setComment] = useState('');

    const post = useMemo(() => posts.find(p => p.id === route.params.postId), [posts, route.params.postId]);

    if (!post) {
        return <View style={styles.container}><Text>لم يتم العثور على المنشور.</Text></View>;
    }

    const isLiked = currentPublicUser ? post.likes.includes(currentPublicUser.id) : false;

    const handleLikeClick = () => {
        if (!isPublicAuthenticated) {
            // @ts-ignore
            navigation.navigate('Login'); // Navigate to login flow
            return;
        }
        toggleLikePost(post.id);
    };

    const handleCommentSubmit = () => {
        if (!comment.trim()) return;
        addComment(post.id, { content: comment });
        setComment('');
    };

    const handleDeleteComment = (commentId: number) => {
        deleteComment(post.id, commentId);
    };
    
    const renderComment = ({ item }: { item: Comment }) => (
        <View style={styles.commentContainer}>
            <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
            <View style={styles.commentBody}>
                <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>{item.username}</Text>
                    {currentPublicUser && currentPublicUser.id === item.userId && (
                        <Pressable onPress={() => handleDeleteComment(item.id)} hitSlop={10}>
                            <TrashIcon color="#ef4444" width={16} height={16} />
                        </Pressable>
                    )}
                </View>
                <Text style={styles.commentContent}>{item.content}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={90} // Adjust this offset as needed
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Image source={{ uri: post.avatar }} style={styles.avatar} />
                        <View style={styles.headerText}>
                            <Text style={styles.username}>{post.username}</Text>
                            <Text style={styles.date}>{new Date(post.date).toLocaleDateString('ar-EG-u-nu-latn')} • {post.category}</Text>
                        </View>
                    </View>
                    {post.title && <Text style={styles.title}>{post.title}</Text>}
                    <Text style={styles.content}>{post.content}</Text>
                    
                    {post.category === 'استطلاع رأي' && <PollDisplay post={post} />}

                    <View style={styles.footer}>
                        <Pressable onPress={handleLikeClick} style={[styles.footerButton, isLiked && styles.likedButton]}>
                            <HandThumbUpIcon color={isLiked ? '#ef4444' : '#64748b'} width={22} height={22} />
                            <Text style={[styles.footerButtonText, isLiked && styles.likedText]}>{post.likes.length} إعجاب</Text>
                        </Pressable>
                         <View style={styles.footerButton}>
                            <ChatBubbleOvalLeftEllipsisIcon color="#64748b" width={22} height={22} />
                            <Text style={styles.footerButtonText}>{post.comments.length} تعليق</Text>
                        </View>
                        <ShareButton title={post.title || ''} message={post.content} />
                    </View>
                </View>

                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>التعليقات</Text>
                    <FlatList
                        data={post.comments}
                        renderItem={renderComment}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false} // The outer ScrollView handles scrolling
                        ListEmptyComponent={<Text style={styles.noCommentsText}>لا توجد تعليقات بعد.</Text>}
                    />
                </View>

            </ScrollView>
            
            {isPublicAuthenticated && (
                <View style={styles.commentInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="أضف تعليقاً..."
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <Pressable onPress={handleCommentSubmit} style={styles.sendButton}>
                        <ArrowUturnLeftIcon color="#fff" width={24} height={24} style={{ transform: [{ rotate: '180deg' }] }} />
                    </Pressable>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: { flex: 1, backgroundColor: '#f1f5f9' },
    container: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 80 }, // Padding for comment input
    card: { backgroundColor: 'white', borderRadius: 16, padding: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    header: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
    avatar: { width: 48, height: 48, borderRadius: 24, marginLeft: 12 },
    headerText: { flex: 1 },
    username: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
    date: { fontSize: 12, color: '#64748b', textAlign: 'right' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, textAlign: 'right' },
    content: { fontSize: 17, color: '#334155', lineHeight: 26, textAlign: 'right' },
    footer: { flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    footerButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, padding: 8 },
    footerButtonText: { color: '#64748b', fontWeight: '600' },
    likedButton: { backgroundColor: '#fee2e2', borderRadius: 20 },
    likedText: { color: '#ef4444' },
    commentsSection: { marginTop: 24 },
    commentsTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 16 },
    commentContainer: { flexDirection: 'row-reverse', gap: 12, marginBottom: 16 },
    commentAvatar: { width: 40, height: 40, borderRadius: 20 },
    commentBody: { flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 12 },
    commentHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
    commentUsername: { fontWeight: 'bold' },
    commentContent: { color: '#334155', marginTop: 4, textAlign: 'right', lineHeight: 22 },
    noCommentsText: { textAlign: 'center', color: '#64748b', paddingVertical: 20 },
    commentInputContainer: { flexDirection: 'row-reverse', alignItems: 'center', padding: 8, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
    textInput: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, textAlign: 'right' },
    sendButton: { backgroundColor: '#0891b2', padding: 10, borderRadius: 25, marginLeft: 8 },
});

export default PostDetailScreen;