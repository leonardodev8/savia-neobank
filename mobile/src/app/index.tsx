import { Text, View } from "react-native";

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-bg">
      <Text className="font-display text-balance text-primary">
        S/ 4,820.50
      </Text>
      <Text className="font-sans-semibold text-title text-ink">
        Movimientos recientes
      </Text>
      <Text className="font-sans text-body text-secondary">
        Tu dinero, claro y en movimiento
      </Text>
    </View>
  );
};

export default Home;
