import { tailwindRunner } from "./runner";

tailwindRunner("Layout - Container", [
  [
    "container",
    {
      styles: {
        container: { width: "100%" },
        container_1: { maxWidth: 640 },
        container_2: { maxWidth: 768 },
        container_3: { maxWidth: 1024 },
        container_4: { maxWidth: 1280 },
        container_5: { maxWidth: 1536 },
      },
      media: {
        container: [
          { media: ["(min-width: 640px)"], suffix: 1 },
          { media: ["(min-width: 768px)"], suffix: 2 },
          { media: ["(min-width: 1024px)"], suffix: 3 },
          { media: ["(min-width: 1280px)"], suffix: 4 },
          { media: ["(min-width: 1536px)"], suffix: 5 },
        ],
      },
    },
  ],
  [
    "sm:container",
    {
      styles: {
        "sm_container_0": { width: "100%" },
        "sm_container_1": { maxWidth: 640 },
        "sm_container_2": { maxWidth: 768 },
        "sm_container_3": { maxWidth: 1024 },
        "sm_container_4": { maxWidth: 1280 },
        "sm_container_5": { maxWidth: 1536 },
      },
      media: {
        "sm_container": [
          { media: ["(min-width: 640px)"], suffix: 0 },
          { media: ["(min-width: 640px)"], suffix: 1 },
          {
            media: ["(min-width: 640px)", "(min-width: 768px)"],
            suffix: 2,
          },
          {
            media: ["(min-width: 640px)", "(min-width: 1024px)"],
            suffix: 3,
          },
          {
            media: ["(min-width: 640px)", "(min-width: 1280px)"],
            suffix: 4,
          },
          {
            media: ["(min-width: 640px)", "(min-width: 1536px)"],
            suffix: 5,
          },
        ],
      },
    },
  ],
]);
