
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useData, useUI } from '../shared';

const Tab = createMaterialTopTabNavigator();

const CityTab = () => {
    const { publicPagesContent } = useData();
    const content = publicPagesContent.aboutCity.city;
    return (
        <ScrollView contentContainerStyle={styles.tabContent}>
            {content.mainParagraphs.map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
            <Text style={styles.subheading}>تخطيط المدينة</Text>
            <Text style={styles.paragraph}>{content.planning}</Text>
            <Text style={styles.subheading}>الطرق والمواصلات</Text>
            <Text style={styles.paragraph}>{content.roads}</Text>
            <Text style={styles.subheading}>المرافق</Text>
            {content.utilities.split('\n\n').map((p, i) => <Text key={i} style={styles.paragraph}>{p}</Text>)}
        </ScrollView>
    );
};

const CompanyTab = () => {
    const { publicPagesContent } = useData();
    const content = publicPagesContent.aboutCity.company;
    return (
        <ScrollView contentContainerStyle={styles.tabContent}>
            <Text style={styles.subheading}>نبذة عن الشركة</Text>
            <Text style={styles.paragraph}>{content.about}</Text>
            <Text style={styles.subheading}>الرؤية</Text>
            <Text style={styles.paragraph}>{content.vision}</Text>
            <Text style={styles.subheading}>الرسالة</Text>
            <Text style={styles.paragraph}>{content.mission}</Text>
        </ScrollView>
    );
};

const BoardTab = () => {
    const { publicPagesContent } = useData();
    const members = publicPagesContent.aboutCity.board;
    return (
        <ScrollView contentContainerStyle={styles.tabContent}>
            {members.map((member, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberTitle}>{member.title}</Text>
                    {member.email && <Text style={styles.memberEmail}>{member.email}</Text>}
                </View>
            ))}
        </ScrollView>
    );
};

const AboutCityScreen = () => {
  const { isDarkMode } = useUI();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#0891b2' },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
        tabBarStyle: { backgroundColor: isDarkMode ? '#1e293b' : 'white' },
      }}
    >
      <Tab.Screen name="City" component={CityTab} options={{ title: 'عن المدينة' }} />
      <Tab.Screen name="Company" component={CompanyTab} options={{ title: 'عن الشركة' }} />
      <Tab.Screen name="Board" component={BoardTab} options={{ title: 'مجلس الإدارة' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    padding: 16,
    backgroundColor: '#f8fafc'
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
    marginTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  memberTitle: {
    fontSize: 14,
    color: '#0891b2',
    textAlign: 'right',
    marginTop: 4,
  },
  memberEmail: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 8,
  }
});

export default AboutCityScreen;
