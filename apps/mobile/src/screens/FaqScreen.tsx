
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useData } from '../shared';
import { ChevronDownIcon } from '../components/Icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FaqScreen = () => {
    const { publicPagesContent } = useData();
    const { categories } = publicPagesContent.faq;
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const handleToggleQuestion = (question: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenQuestion(openQuestion === question ? null : question);
    };

    return (
        <ScrollView style={styles.container}>
            {categories.map((cat, catIndex) => (
                <View key={catIndex} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{cat.category}</Text>
                    {cat.items.map((item, itemIndex) => {
                        const isOpen = openQuestion === item.q;
                        return (
                            <View key={itemIndex} style={styles.faqItem}>
                                <TouchableOpacity onPress={() => handleToggleQuestion(item.q)} style={styles.questionHeader}>
                                    <Text style={styles.questionText}>{item.q}</Text>
                                    <ChevronDownIcon color="#64748b" width={20} height={20} style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}/>
                                </TouchableOpacity>
                                {isOpen && (
                                    <View style={styles.answerContainer}>
                                        <Text style={styles.answerText}>{item.a}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9', padding: 16 },
    categoryContainer: { marginBottom: 24 },
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 16,
        color: '#1e293b',
    },
    faqItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    questionHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'right',
    },
    answerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    answerText: {
        fontSize: 15,
        color: '#475569',
        textAlign: 'right',
        lineHeight: 22,
    },
});

export default FaqScreen;
