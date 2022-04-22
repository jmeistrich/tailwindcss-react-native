import { Text } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { MotiText } from "moti";
import { TestComponent } from "./rn/test";
import { WebComponent } from "./web/web";
export function Test() {
  return (
    <TailwindProvider>
      <Text
        style={{
          $$css: true,
          tailwindcssReactNative: "font-bold",
        }}
      >
        Hello world!
      </Text>
      <MotiText className="font-bold">Do not transform</MotiText>
      <TestComponent
        style={{
          $$css: true,
          tailwindcssReactNative: "font-bold",
        }}
      >
        Do not transform
      </TestComponent>
      <WebComponent className="font-bold">Do not transform</WebComponent>
    </TailwindProvider>
  );
}
