
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useServices } from '../shared';
import { useNavigation } from '@react-navigation/native';
import { getIcon } from '../components/iconUtils';
import { ChevronDownIcon } from '../components/Icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ServicesStackParamList = {
  Services: undefined;
  ServiceList: { subCategoryId: number, title: string };
};
type ServicesScreenNavigationProp = NativeStackNavigationProp<ServicesStackParamList, 'Services'>;


const ServicesScreen = () => {
  const navigation = useNavigation<ServicesScreenNavigationProp>();
  const { categories } = useServices();
  const serviceCategories = categories.filter(c => c.name !== "المدينة والجهاز");
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(serviceCategories[0]?.id || null);

  const handleToggleCategory = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenCategoryId(prevId => (prevId === id ? null : id));
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>تصفح الخدمات</Text>
      </View>
      <View style={styles.content}>
        {serviceCategories.map(category => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => handleToggleCategory(category.id)} style={styles.categoryHeader}>
              <View style={styles.categoryTitleContainer}>
                {getIcon(category.icon, { width: 32, height: 32, color: '#0891b2' })}
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </View>
              <ChevronDownIcon color="#64748b" width={24} height={24} style={{ transform: [{ rotate: openCategoryId === category.id ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>
            {openCategoryId === category.id && (
              <View style={styles.subCategoryGrid}>
                {category.subCategories.map(sub => (
                  <TouchableOpacity 
                    key={sub.id} 
                    style={styles.subCategoryItem}
                    onPress={() => navigation.navigate('ServiceList', { subCategoryId: sub.id, title: sub.name })}
                  >
                    <Text style={styles.subCategoryText}>{sub.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', // slate-100
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0', // slate-200
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b', // slate-800
    textAlign: 'right',
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryTitleContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subCategoryGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  subCategoryItem: {
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  subCategoryText: {
    fontSize: 16,
    color: '#475569', // slate-600
    textAlign: 'right',
  },
});

export default ServicesScreen;
