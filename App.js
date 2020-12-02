import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mainpage from './pages/Mainpage';
import AdvSearch from'./pages/AdvSearch';
import { Ionicons} from '@expo/vector-icons'
//import Fiddlin from'./pages/Playground';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      <Tab.Navigator      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          if (route.name === 'Mainpage') {
            iconName = 'md-home';
          }
          else if (route.name === 'AdvSearch'){
            iconName = 'md-search';
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
      })}>
        <Tab.Screen name="Mainpage" component={Mainpage} />
        <Tab.Screen name="AdvSearch" component={AdvSearch} />
      </Tab.Navigator>
      </NavigationContainer>
   
  );
}
