
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity, useUI } from '../../shared';
import type { PostCategory } from '../../shared';
import { PlusIcon, TrashIcon } from '../../components/Icons';

const NewPostScreen = () => {
    const navigation = useNavigation();
    const { addPost, circles } = useCommunity();
    const { showToast } = useUI();
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
        if (!content.trim() && category !== 'استطلاع رأي') {
             showToast('يرجى كتابة محتوى المنشور.', 'error');
             return;
        }
        
        let postData: any = { category, title: title.trim() || undefined, content, circleId };
        
        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => ({ option: opt.trim() })).filter(opt => opt.option);
            if (validOptions.length < 2) { 
                showToast('يجب إضافة خيارين على الأقل للاستطلاع.', 'error');
                return; 
            } 
            postData.pollOptions = validOptions;
        }

        addPost(postData);
        navigation.goBack();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
         <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
        >
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                
                <View style={styles.categoryContainer}>
                    <Text style={styles.label}>نوع المنشور:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row-reverse' }} contentContainerStyle={{ paddingHorizontal: 4 }}>
                        {postCategories.map(cat => (
                            <TouchableOpacity 
                                key={cat} 
                                onPress={() => setCategory(cat)}
                                style={[styles.catButton, category === cat && styles.activeCatButton]}
                            >
                                <Text style={[styles.catButtonText, category === cat && styles.activeCatButtonText]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <TextInput 
                    style={styles.input} 
                    placeholder="العنوان (اختياري)" 
                    value={title} 
                    onChangeText={setTitle} 
                    placeholderTextColor="#94a3b8"
                />
                
                <TextInput 
                    style={[styles.input, { height: 150, textAlignVertical: 'top' }]} 
                    multiline 
                    placeholder="اكتب ما يدور في ذهنك..." 
                    value={content} 
                    onChangeText={setContent} 
                    placeholderTextColor="#94a3b8"
                />

                {category === 'استطلاع رأي' && (
                    <View style={styles.pollSection}>
                        <Text style={styles.sectionTitle}>خيارات الاستطلاع</Text>
                        {pollOptions.map((option, index) => (
                            <View key={index} style={styles.pollOptionContainer}>
                                <TextInput 
                                    style={styles.pollInput} 
                                    value={option} 
                                    onChangeText={v => handlePollOptionChange(index, v)} 
                                    placeholder={`خيار ${index + 1}`} 
                                    placeholderTextColor="#94a3b8"
                                />
                                {pollOptions.length > 2 && <TouchableOpacity onPress={() => removePollOption(index)} style={styles.removeButton}><TrashIcon color="#ef4444" width={20} height={20} /></TouchableOpacity>}
                            </View>
                        ))}
                        <TouchableOpacity onPress={addPollOption} style={styles.addOptionButton}>
                            <PlusIcon color="#0891b2" width={16} height={16} />
                            <Text style={styles.addOptionText}>إضافة خيار</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>نشر</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    contentContainer: { padding: 16, paddingBottom: 40 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#334155', textAlign: 'right', marginBottom: 8, marginLeft: 8 },
    categoryContainer: { marginBottom: 16 },
    catButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'white', marginLeft: 8, borderWidth: 1, borderColor: '#e2e8f0' },
    activeCatButton: { backgroundColor: '#0891b2', borderColor: '#0891b2' },
    catButtonText: { color: '#64748b' },
    activeCatButtonText: { color: 'white', fontWeight: 'bold' },
    input: { backgroundColor: 'white', padding: 12, borderRadius: 8, textAlign: 'right', marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#e2e8f0' },
    pollSection: { marginTop: 16, backgroundColor: 'white', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'right', marginBottom: 12, color: '#334155' },
    pollOptionContainer: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 8 },
    pollInput: { flex: 1, backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8, textAlign: 'right', marginRight: 8 },
    removeButton: { padding: 8 },
    addOptionButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 4, marginTop: 8, alignSelf: 'flex-start' },
    addOptionText: { color: '#0891b2', fontWeight: 'bold' },
    submitButton: { backgroundColor: '#0891b2', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 32, elevation: 2 },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});


export default NewPostScreen;
