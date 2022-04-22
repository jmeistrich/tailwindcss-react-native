import { Text } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { MotiText } from "moti";
import { TestComponent } from "./rn/test";
import { WebComponent } from "./web/web";

export function Test() {
  return (
    <TailwindProvider>
      <Text className="font-bold">Hello world!</Text>
      <MotiText className="font-bold">Do not transform</MotiText>
      <TestComponent className="font-bold">Hello World</TestComponent>
      <WebComponent className="font-bold">Do not transform</WebComponent>
    </TailwindProvider>
  );
}
