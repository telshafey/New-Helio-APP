import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import { useAuth } from '../../../../../packages/shared-logic/src/context/AuthContext';
import type { Post } from '../../../../../packages/shared-logic/src/types';

const PollDisplay: React.FC<{ post: Post }> = ({ post }) => {
    const { voteOnPoll } = useCommunity();
    const { currentPublicUser } = useAuth();
    const navigation = useNavigation();

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
        e.stopPropagation(); // Prevent card navigation
        e.preventDefault();
        if (!currentPublicUser) {
            // @ts-ignore
            navigation.navigate('Login');
            return;
        }
        voteOnPoll(post.id, optionIndex);
    };

    if (!post.pollOptions) return null;

    return (
        <View style={styles.pollContainer}>
            {hasVoted ? (
                // Results View
                post.pollOptions.map((option, index) => {
                    const percentage = totalVotes > 0 ? (option.votes.length / totalVotes) * 100 : 0;
                    const isUserChoice = index === userVoteIndex;
                    return (
                        <View key={index} style={[styles.pollResultOption, isUserChoice && styles.userChoiceBackground]}>
                            <View style={styles.pollResultTextContainer}>
                                <Text style={[styles.pollOptionText, isUserChoice && styles.userChoiceText]}>{option.option}</Text>
                                <Text style={styles.pollPercentageText}>{Math.round(percentage)}%</Text>
                            </View>
                            <View style={styles.pollResultBar}>
                                <View style={[styles.pollResultBarFill, { width: `${percentage}%` }]} />
                            </View>
                        </View>
                    );
                })
            ) : (
                // Voting View
                post.pollOptions.map((option, index) => (
                    <Pressable key={index} onPress={(e: any) => handleVote(e, index)} style={styles.pollVoteOption}>
                        <Text style={styles.pollOptionText}>{option.option}</Text>
                    </Pressable>
                ))
            )}
             <Text style={styles.totalVotesText}>{totalVotes} إجمالي الأصوات</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  pollContainer: { marginTop: 12 },
  pollVoteOption: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 8 },
  pollOptionText: { fontSize: 16, fontWeight: '600', textAlign: 'right' },
  pollResultOption: { marginBottom: 8, padding: 8, borderRadius: 8, borderWidth: 2, borderColor: '#e2e8f0' },
  userChoiceBackground: { borderColor: '#0891b2', backgroundColor: '#f0f9ff' },
  userChoiceText: { color: '#0369a1' },
  pollResultTextContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 4 },
  pollPercentageText: { fontSize: 14, fontWeight: 'bold', color: '#64748b' },
  pollResultBar: { backgroundColor: '#e2e8f0', height: 8, borderRadius: 4 },
  pollResultBarFill: { backgroundColor: '#0891b2', height: 8, borderRadius: 4 },
  totalVotesText: { textAlign: 'center', color: '#64748b', fontSize: 12, marginTop: 8 }
});

export default PollDisplay;
