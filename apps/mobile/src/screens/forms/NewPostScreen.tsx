import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../../../packages/shared-logic/src/context/AppContext';
import type { PostCategory } from '../../../../../packages/shared-logic/src/types';
import { PlusIcon, TrashIcon } from '../../components/Icons';

const NewPostScreen = () => {
    const navigation = useNavigation();
    const { addPost, circles } = useCommunity();
    const [circleId, setCircleId] = useState<number>(circles[0]?.id || 1);
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

    const handleSubmit = () => {
        // Validation
        if (!content.trim() && category !== 'استطلاع رأي') return;
        
        let postData: any = { category, title: title.trim() || undefined, content, circleId };
        
        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => ({ option: opt.trim() })).filter(opt => opt.option);
            if (validOptions.length < 2) { return; } // Add user feedback
            postData.pollOptions = validOptions;
        }

        addPost(postData);
        navigation.goBack();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <ScrollView style={styles.container}>
            {/* Circle & Category would be custom Picker components in a real app */}
            <TextInput style={styles.input} placeholder="العنوان (اختياري)" value={title} onChangeText={setTitle} />
            <TextInput style={[styles.input, { height: 120 }]} multiline placeholder="اكتب ما يدور في ذهنك..." value={content} onChangeText={setContent} />

            {category === 'استطلاع رأي' && (
                <View style={styles.pollSection}>
                    <Text style={styles.sectionTitle}>خيارات الاستطلاع</Text>
                    {pollOptions.map((option, index) => (
                        <View key={index} style={styles.pollOptionContainer}>
                            <TextInput style={styles.pollInput} value={option} onChangeText={v => handlePollOptionChange(index, v)} placeholder={`خيار ${index + 1}`} />
                            {pollOptions.length > 2 && <TouchableOpacity onPress={() => removePollOption(index)}><TrashIcon color="#ef4444" width={20} height={20} /></TouchableOpacity>}
                        </View>
                    ))}
                    <TouchableOpacity onPress={addPollOption} style={styles.addOptionButton}><PlusIcon color="#0891b2" width={16} height={16} /><Text style={styles.addOptionText}>إضافة خيار</Text></TouchableOpacity>
                </View>
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>نشر</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16 },
    pollSection: { marginTop: 16 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginBottom: 8 },
    pollOptionContainer: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
    pollInput: { flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 8, textAlign: 'right', marginRight: 8 },
    addOptionButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, marginTop: 8 },
    addOptionText: { color: '#0891b2', fontWeight: 'bold' },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});


export default NewPostScreen;
