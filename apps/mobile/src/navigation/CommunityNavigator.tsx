import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/CommunityScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import NewPostScreen from '../screens/forms/NewPostScreen';
import NewMarketplaceItemScreen from '../screens/forms/NewMarketplaceItemScreen';
import NewJobScreen from '../screens/forms/NewJobScreen';
import NewLostAndFoundScreen from '../screens/forms/NewLostAndFoundScreen';

const Stack = createNativeStackNavigator();

const CommunityNavigator = () => {
  return (
    <Stack.Navigator 
        screenOptions={{ 
            headerBackTitleVisible: false,
            headerTintColor: '#0891b2',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center'
        }}
    >
      <Stack.Screen name="Community" component={CommunityScreen} options={{ title: "المجتمع" }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: "تفاصيل المنشور" }} />
      {/* Form Screens */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="NewPost" component={NewPostScreen} options={{ title: "منشور جديد" }} />
        <Stack.Screen name="NewMarketplaceItem" component={NewMarketplaceItemScreen} options={{ title: "إضافة إعلان بيع" }} />
        <Stack.Screen name="NewJob" component={NewJobScreen} options={{ title: "إضافة وظيفة" }} />
        <Stack.Screen name="NewLostAndFound" component={NewLostAndFoundScreen} options={{ title: "إضافة بلاغ" }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default CommunityNavigator;
