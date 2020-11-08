import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mainpage from './pages/Mainpage';
import Activities from'./pages/Activities';
import Fiddlin from'./pages/Playground';

//npm install @react-navigation/bottom-tabs

const Tab = createBottomTabNavigator();

export default function App() {

  const Stack = createStackNavigator();
  //
  return (
    
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Mainpage" component={Mainpage} />
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Playground" component={Fiddlin} />
      </Tab.Navigator>
      </NavigationContainer>
   
  );
}
