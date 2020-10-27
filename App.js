import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import Mainpage from './pages/Mainpage';
import Activities from'./pages/Activities';

export default function App() {

  const Stack = createStackNavigator();


  return (

    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name="Main" component={Mainpage} />
        <Tab.Screen name="Advanced search" component={AdvancedSearch} />
        </Tab.Navigator>
    </NavigationContainer>

  );
}
