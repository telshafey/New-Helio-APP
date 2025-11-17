import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import JobPostingCard from './JobPostingCard';
import EmptyState from '../common/EmptyState';
import { BriefcaseIcon } from '../Icons';
import JobCardSkeleton from '../skeletons/JobCardSkeleton';

const JobsTab = () => {
    const { jobPostings, loading } = useCommunity();

    const approvedJobs = React.useMemo(() => {
        return jobPostings
            .filter(job => job.status === 'approved')
            .sort((a,b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
    }, [jobPostings]);
    
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                    <JobCardSkeleton />
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={approvedJobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <JobPostingCard job={item} />}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
                <View style={{marginTop: 50}}>
                    <EmptyState
                        icon={<BriefcaseIcon width={64} height={64} color="#9ca3af" />}
                        title="لا توجد وظائف"
                        message="لا توجد وظائف متاحة في الوقت الحالي."
                    />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    contentContainer: { padding: 16 },
    separator: { height: 16 },
});

export default JobsTab;
