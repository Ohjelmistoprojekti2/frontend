import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mainpage from './pages/Mainpage';
import Activities from'./pages/Activities';
import AdvancedSearch from'./pages/AdvancedSearch';
import Checkbox from'./pages/Checkbox';

const Tab = createBottomTabNavigator();


export default function App() {
  return (

    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Main" component={Mainpage} />
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Advanced Search" component={AdvancedSearch} />
        <Tab.Screen name="Checkbox" component={Checkbox} />
        </Tab.Navigator>
    </NavigationContainer>

  );
}
