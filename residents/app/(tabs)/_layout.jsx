import { Tabs } from "expo-router";
import './../../style/globals.css';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{title: 'Home'}}/>
      <Tabs.Screen name="bins" options={{title: 'Bins'}}/>
      <Tabs.Screen name="request" options={{title: 'Request'}}/>
      <Tabs.Screen name="alert" options={{title: 'Alert'}}/>
      <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
    </Tabs>
  );
}
