import { Tabs } from "expo-router/js-tabs";
import { TabBar } from "@/shared/components/ui/TabBar";
import {
  CardsIcon,
  HomeIcon,
  MovementsIcon,
  ProfileIcon,
  TransferArrowsIcon,
} from "@/shared/components/ui/icons";

const TabsLayout = () => (
  <Tabs
    tabBar={(props) => <TabBar {...props} fabRouteName="transfer" />}
    screenOptions={{ headerShown: false }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Inicio",
        tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
      }}
    />
    <Tabs.Screen
      name="movements"
      options={{
        title: "Movimientos",
        tabBarIcon: ({ color, size }) => (
          <MovementsIcon color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="transfer"
      options={{
        title: "Transferir",
        tabBarIcon: ({ color, size }) => (
          <TransferArrowsIcon color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="cards"
      options={{
        title: "Tarjetas",
        tabBarIcon: ({ color, size }) => (
          <CardsIcon color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Perfil",
        tabBarIcon: ({ color, size }) => (
          <ProfileIcon color={color} size={size} />
        ),
      }}
    />
  </Tabs>
);

export default TabsLayout;
