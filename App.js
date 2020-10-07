import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import Mainpage from './pages/Mainpage';
import Activities from'./pages/Activities';

export default function App() {

  const Stack = createStackNavigator();


  return (
    
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Mainpage" component={Mainpage} />
        <Stack.Screen name="Activities" component={Activities} />
      </Stack.Navigator>
      </NavigationContainer>
   
  );
}
