import { createStackNavigator } from '@react-navigation/stack';
import Users from './Users';
import User from './User';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
        
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="User" component={User} />
      
    </Stack.Navigator>
  );
}