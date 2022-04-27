import { PropsWithChildren } from "react";
import { useWindowDimensions as RNuseWindowDimensions } from "react-native";
import { renderHook } from "@testing-library/react-hooks";
import { useTailwind } from "../src/use-tailwind";
import { TailwindProvider, TailwindProviderProps } from "../src/provider";

const useWindowDimensions: jest.Mock<
  Partial<ReturnType<typeof RNuseWindowDimensions>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = RNuseWindowDimensions as any;

jest.mock("react-native", () => {
  const { Appearance, Dimensions } = jest.requireActual("react-native");

  return {
    __esModule: true,
    Appearance,
    Dimensions,
    useWindowDimensions: jest.fn(() => ({
      width: 750,
      height: 1334,
      scale: 1,
      fontScale: 1,
    })),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const wrapper = ({
  children,
  ...props
}: PropsWithChildren<TailwindProviderProps>) => (
  <TailwindProvider {...props}>{children}</TailwindProvider>
);

describe("web", () => {
  test("can accept no arguments", () => {
    const { result } = renderHook(() => useTailwind(), {
      wrapper,
      initialProps: { platform: "web" },
    });

    expect(result.current.$$css).toBe(true);
    expect(result.current.tailwindClassName).toBe("");
  });

  test("will pass-through any arguments", () => {
    const { result } = renderHook(() => useTailwind("hello-world"), {
      wrapper,
      initialProps: { platform: "web" },
    });

    expect(result.current.$$css).toBe(true);
    expect(result.current.tailwindClassName).toBe("hello-world");
  });
});

describe("native", () => {
  test("can accept no arguments", () => {
    const { result } = renderHook(() => useTailwind(), {
      wrapper,
      initialProps: { platform: "native" },
    });

    expect(result.current).toEqual([]);
  });

  test("will return nothing is no styles match", () => {
    const { result } = renderHook(() => useTailwind("hello-world"), {
      wrapper,
      initialProps: { platform: "native" },
    });

    expect(result.current).toEqual([]);
  });

  test("will return matched styles", () => {
    const { result } = renderHook(() => useTailwind("font-bold"), {
      wrapper,
      initialProps: {
        platform: "native",
        styles: {
          "font-bold": {
            fontWeight: "700",
          },
          "font-extrabold": {
            fontWeight: "800",
          },
        },
      },
    });

    expect(result.current).toEqual([{ fontWeight: "700" }]);
  });

  test("media - width", () => {
    useWindowDimensions.mockReturnValue({
      width: 1000,
    });

    const { result } = renderHook(() => useTailwind("container"), {
      wrapper,
      initialProps: {
        platform: "native",
        styles: {
          container: {
            width: "100%",
          },
          container_1: {
            maxWidth: 640,
          },
          container_2: {
            maxWidth: 768,
          },
          container_3: {
            maxWidth: 1024,
          },
          container_4: {
            maxWidth: 1280,
          },
          container_5: {
            maxWidth: 1536,
          },
        },
        media: {
          container: [
            ["(min-width: 640px)", 1],
            ["(min-width: 768px)", 2],
            ["(min-width: 1024px)", 3],
            ["(min-width: 1280px)", 4],
            ["(min-width: 1536px)", 5],
          ],
        },
      },
    });

    expect(result.current).toEqual([
      { width: "100%" },
      { maxWidth: 640 },
      { maxWidth: 768 },
    ]);
  });

  test("media - platform prefix", () => {
    const { result } = renderHook(() => useTailwind("w-px"), {
      wrapper,
      initialProps: {
        platform: "ios",
        styles: {
          "w-px_1": {
            width: 1,
          },
          "w-px_2": {
            width: 1,
          },
        },
        media: {
          "w-px": [
            ["ios", 1],
            ["android", 2],
          ],
        },
      },
    });

    expect(result.current).toEqual([{ width: 1 }]);
  });
});