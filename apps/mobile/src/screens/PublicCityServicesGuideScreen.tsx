import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useData } from '../../../../packages/shared-logic/src/context/DataContext';
import { ChevronDownIcon } from '../components/Icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PublicCityServicesGuideScreen = () => {
    const { serviceGuides } = useData();
    const [openGuideId, setOpenGuideId] = useState<number | null>(serviceGuides[0]?.id || null);

    const handleToggleGuide = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenGuideId(openGuideId === id ? null : id);
    };
    
    return (
        <ScrollView style={styles.container}>
            {serviceGuides.map(guide => (
                <View key={guide.id} style={styles.guideContainer}>
                    <TouchableOpacity onPress={() => handleToggleGuide(guide.id)} style={styles.guideHeader}>
                        <Text style={styles.guideTitle}>{guide.title}</Text>
                        <ChevronDownIcon color="#64748b" width={24} height={24} style={{ transform: [{ rotate: openGuideId === guide.id ? '180deg' : '0deg' }] }}/>
                    </TouchableOpacity>
                    {openGuideId === guide.id && (
                        <View style={styles.guideContent}>
                            <Text style={styles.subheading}>خطوات التقديم</Text>
                            {guide.steps.map((step, i) => <Text key={`s-${i}`} style={styles.listItem}>{`${i + 1}. ${step}`}</Text>)}
                            <Text style={[styles.subheading, { marginTop: 16 }]}>الأوراق المطلوبة</Text>
                            {guide.documents.map((doc, i) => <Text key={`d-${i}`} style={styles.listItem}>{`${i + 1}. ${doc}`}</Text>)}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  guideContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  guideHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
    textAlign: 'right',
  },
  guideContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0891b2',
    textAlign: 'right',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: 4,
  },
});

export default PublicCityServicesGuideScreen;
