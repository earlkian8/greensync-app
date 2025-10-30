import { Tabs } from "expo-router";
import './../../style/globals.css';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'Home'}}/>
    </Tabs>
  );
}
