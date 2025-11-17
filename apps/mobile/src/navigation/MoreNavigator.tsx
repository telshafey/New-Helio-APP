import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoreScreen from '../screens/MoreScreen';
import AboutCityScreen from '../screens/AboutCityScreen';
import PublicCityServicesGuideScreen from '../screens/PublicCityServicesGuideScreen';
import AboutAppScreen from '../screens/AboutAppScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactScreen from '../screens/ContactScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyBusinessScreen from '../screens/MyBusinessScreen';
import MyOffersScreen from '../screens/MyOffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OffersScreen from '../screens/OffersScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import PublicTransportationScreen from '../screens/PublicTransportationScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewOfferScreen from '../screens/forms/NewOfferScreen';


const Stack = createNativeStackNavigator();

const MoreNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerBackTitleVisible: false,
        headerTintColor: '#0891b2',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen name="More" component={MoreScreen} options={{ headerShown: false }} />
      
      {/* Auth Flow as modals */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'إنشاء حساب' }} />
        <Stack.Screen name="NewOffer" component={NewOfferScreen} options={{ title: 'إضافة عرض جديد' }} />
      </Stack.Group>
      
      {/* User specific */}
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'الملف الشخصي' }}/>
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'المفضلة' }}/>
      <Stack.Screen name="MyBusiness" component={MyBusinessScreen} options={{ title: 'إدارة أعمالي' }}/>
      <Stack.Screen name="MyOffers" component={MyOffersScreen} options={{ title: 'عروضي' }}/>

      {/* City Info */}
      <Stack.Screen name="Transportation" component={PublicTransportationScreen} options={{ title: 'دليل المواصلات' }}/>
      <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ title: 'أرقام الطوارئ' }}/>
      <Stack.Screen name="CityServicesGuide" component={PublicCityServicesGuideScreen} options={{ title: 'خدمات جهاز المدينة' }}/>
      <Stack.Screen name="AboutCity" component={AboutCityScreen} options={{ title: 'عن المدينة والشركة' }}/>
      <Stack.Screen name="Offers" component={OffersScreen} options={{ title: 'العروض' }}/>
      
      {/* App Info */}
      <Stack.Screen name="AboutApp" component={AboutAppScreen} options={{ title: 'حول التطبيق' }}/>
      <Stack.Screen name="Faq" component={FaqScreen} options={{ title: 'الأسئلة الشائعة' }}/>
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'تواصل معنا' }}/>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'سياسة الخصوصية' }}/>
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ title: 'شروط الاستخدام' }}/>

    </Stack.Navigator>
  );
};

export default MoreNavigator;