import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SectionList } from 'react-native';
import { useAuth } from '../../../../packages/shared-logic/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { 
    UserCircleIcon, HeartIcon, BuildingStorefrontIcon, TagIcon, 
    TruckIcon, BuildingLibraryIcon, DocumentDuplicateIcon, QuestionMarkCircleIcon, 
    InformationCircleIcon, BookOpenIcon, ArrowLeftOnRectangleIcon, PhoneIcon
} from '../components/Icons';

type MoreStackParamList = { [key: string]: undefined };
type MoreScreenNavigationProp = NativeStackNavigationProp<MoreStackParamList, 'More'>;

const ListItem: React.FC<{ title: string; icon: React.ReactNode; onPress: () => void }> = ({ title, icon, onPress }) => (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={{ transform: [{ scaleX: -1 }] }}>{icon}</View>
        <Text style={styles.listItemText}>{title}</Text>
    </TouchableOpacity>
);

const MoreScreen = () => {
    const navigation = useNavigation<MoreScreenNavigationProp>();
    const { isPublicAuthenticated, currentPublicUser, publicLogout } = useAuth();
    const isServiceProvider = currentPublicUser?.role === 'service_provider';
    
    const handleLogout = () => {
        publicLogout();
        // The App will automatically re-render to the signed-out state
    };

    const sections = [
        {
            title: 'معلومات المدينة',
            data: [
                { title: 'دليل المواصلات', icon: <TruckIcon color="#6b7280" width={24} height={24} />, screen: 'Transportation' },
                { title: 'أرقام الطوارئ', icon: <PhoneIcon color="#6b7280" width={24} height={24} />, screen: 'Emergency' },
                { title: 'خدمات جهاز المدينة', icon: <DocumentDuplicateIcon color="#6b7280" width={24} height={24} />, screen: 'CityServicesGuide' },
                { title: 'عن المدينة والشركة', icon: <BuildingLibraryIcon color="#6b7280" width={24} height={24} />, screen: 'AboutCity' },
            ]
        },
        {
            title: 'حول التطبيق',
            data: [
                { title: 'حول التطبيق', icon: <InformationCircleIcon color="#6b7280" width={24} height={24} />, screen: 'AboutApp' },
                { title: 'الأسئلة الشائعة', icon: <QuestionMarkCircleIcon color="#6b7280" width={24} height={24} />, screen: 'Faq' },
                { title: 'تواصل معنا', icon: <PhoneIcon color="#6b7280" width={24} height={24} />, screen: 'Contact' },
                { title: 'سياسة الخصوصية', icon: <BookOpenIcon color="#6b7280" width={24} height={24} />, screen: 'PrivacyPolicy' },
                { title: 'شروط الاستخدام', icon: <BookOpenIcon color="#6b7280" width={24} height={24} />, screen: 'TermsOfUse' },
            ]
        }
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                {isPublicAuthenticated && currentPublicUser ? (
                    <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate('Profile')}>
                        <UserCircleIcon color="#fff" width={64} height={64} />
                        <View>
                            <Text style={styles.profileName}>{currentPublicUser.name}</Text>
                            <Text style={styles.profileAction}>عرض الملف الشخصي</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.loginHeader}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerButtonText}>إنشاء حساب</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {isPublicAuthenticated && (
                <View style={styles.quickAccessContainer}>
                    {isServiceProvider ? (
                        <ListItem title="إدارة أعمالي" icon={<BuildingStorefrontIcon color="#6b7280" width={24} height={24} />} onPress={() => navigation.navigate('MyBusiness')} />
                    ) : (
                        <ListItem title="عروضي" icon={<TagIcon color="#6b7280" width={24} height={24} />} onPress={() => navigation.navigate('MyOffers')} />
                    )}
                     <ListItem title="المفضلة" icon={<HeartIcon color="#6b7280" width={24} height={24} />} onPress={() => navigation.navigate('Favorites')} />
                </View>
            )}

            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.title + index}
                renderItem={({ item }) => <ListItem title={item.title} icon={item.icon} onPress={() => navigation.navigate(item.screen)} />}
                renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
                scrollEnabled={false} // The outer ScrollView handles scrolling
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
            
            {isPublicAuthenticated && (
                <View style={{ padding: 16 }}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <ArrowLeftOnRectangleIcon color="#ef4444" width={24} height={24} />
                        <Text style={styles.logoutButtonText}>تسجيل الخروج</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  headerContainer: { backgroundColor: '#0891b2', padding: 16, paddingTop: 60, paddingBottom: 32 },
  profileHeader: { flexDirection: 'row-reverse', alignItems: 'center', gap: 16 },
  profileName: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'right' },
  profileAction: { fontSize: 14, color: '#cffafe', textAlign: 'right' },
  loginHeader: { flexDirection: 'row-reverse', justifyContent: 'space-around' },
  loginButton: { flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 8, marginRight: 8 },
  loginButtonText: { color: '#0891b2', fontWeight: 'bold', textAlign: 'center' },
  registerButton: { flex: 1, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white', padding: 12, borderRadius: 8, marginLeft: 8 },
  registerButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  quickAccessContainer: { margin: 16, marginTop: -16, backgroundColor: 'white', borderRadius: 12, elevation: 3 },
  listItem: { flexDirection: 'row-reverse', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  listItemText: { fontSize: 16, color: '#1e293b', marginRight: 16, flex: 1, textAlign: 'right' },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: 16, marginBottom: 8 },
  logoutButton: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fee2e2', padding: 14, borderRadius: 8 },
  logoutButtonText: { color: '#ef4444', fontWeight: 'bold' }
});

export default MoreScreen;