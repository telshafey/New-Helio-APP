
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity, useAuth } from '../../shared';
import type { Post } from '../../shared';
import { HandThumbUpIcon, ChatBubbleOvalLeftIcon, PinIcon } from '../Icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PollDisplay from './PollDisplay';
import type { GestureResponderEvent } from 'react-native';

type CommunityStackParamList = {
    Community: undefined;
    PostDetail: { postId: number };
};
type PostCardNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Community'>;


const PostCard: React.FC<{ post: Post }> = ({ post }) => {
    const { toggleLikePost } = useCommunity();
    const { currentPublicUser } = useAuth();
    const navigation = useNavigation<PostCardNavigationProp>();
    const isLiked = currentPublicUser ? post.likes.includes(currentPublicUser.id) : false;

    const handleLikeClick = (e: GestureResponderEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(!currentPublicUser) {
            // In a real app, you might navigate to a login screen
            return;
        }
        toggleLikePost(post.id);
    };

    return (
        <Pressable onPress={() => navigation.navigate('PostDetail', { postId: post.id })} style={[styles.card, post.isPinned && styles.pinnedCard]}>
            {post.isPinned && (
                <View style={styles.pinnedBanner}>
                    <PinIcon color="#0891b2" width={16} height={16} />
                    <Text style={styles.pinnedText}>مثبت</Text>
                </View>
            )}
            <View style={styles.header}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <View style={styles.headerText}>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.date}>{new Date(post.date).toLocaleDateString('ar-EG-u-nu-latn')} • {post.category}</Text>
                </View>
            </View>
            {post.title && <Text style={styles.title}>{post.title}</Text>}
            <Text style={styles.content} numberOfLines={3}>{post.content}</Text>
            
            {post.category === 'استطلاع رأي' && <PollDisplay post={post} />}

            <View style={styles.footer}>
                <View style={styles.stats}>
                    <ChatBubbleOvalLeftIcon color="#64748b" width={20} height={20} />
                    <Text style={styles.statsText}>{post.comments.length}</Text>
                </View>
                <Pressable onPress={handleLikeClick} style={[styles.likeButton, isLiked && styles.likedButton]}>
                    <HandThumbUpIcon color={isLiked ? '#ef4444' : '#64748b'} width={20} height={20} />
                    <Text style={[styles.statsText, isLiked && styles.likedText]}>{post.likes.length}</Text>
                </Pressable>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  pinnedCard: { borderWidth: 2, borderColor: '#0891b2' },
  pinnedBanner: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, marginBottom: 8 },
  pinnedText: { color: '#0891b2', fontWeight: 'bold' },
  header: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginLeft: 12 },
  headerText: { flex: 1 },
  username: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  date: { fontSize: 12, color: '#64748b', textAlign: 'right' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, textAlign: 'right' },
  content: { fontSize: 16, color: '#334155', lineHeight: 24, textAlign: 'right' },
  footer: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  stats: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4 },
  statsText: { color: '#64748b', fontWeight: '600' },
  likeButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  likedButton: { backgroundColor: '#fee2e2' },
  likedText: { color: '#ef4444' },
});


export default PostCard;