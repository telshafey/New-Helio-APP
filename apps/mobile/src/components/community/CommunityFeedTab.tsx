import React, { useState, useMemo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import PostCard from './PostCard';
import EmptyState from '../common/EmptyState';
// FIX: Replaced missing icon with the available one.
import { ChatBubbleOvalLeftIcon } from '../Icons';

const CommunityFeedTab = () => {
    const { posts } = useCommunity();

    // Simple sort for now, can be expanded with filters later
    const sortedPosts = [...posts].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <FlatList
            data={sortedPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PostCard post={item} />}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
                <View style={{marginTop: 50}}>
                    <EmptyState
                        icon={<ChatBubbleOvalLeftIcon width={64} height={64} color="#9ca3af" />}
                        title="لا توجد منشورات"
                        message="كن أول من يضيف منشوراً في المجتمع!"
                    />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
    },
    contentContainer: {
        padding: 16,
    },
    separator: {
        height: 16,
    },
});


export default CommunityFeedTab;