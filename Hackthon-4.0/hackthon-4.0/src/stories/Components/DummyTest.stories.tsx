// // Globals
// import type { Meta, StoryObj } from "@storybook/react";
// // components
// import DummyTestComp, {
//   DummyTestProps,
// } from "@/Components/DummyComponent/DummyTest";
// // libs
// // import { expandObj, flattenObj } from "lib/object-parser";
// // mock
// import { defaultData } from "./DummyTest";
// import "../../styles/index.css";

// //👇 This default export determines where your story goes in the story list
// const meta: Meta<typeof DummyTestComp> = {
//   title: "Components/DummyComponent/DummyTest",
//   component: DummyTestComp,
//   argTypes: {
//     theme: {
//       control: "select",
//       options: ["light", "dark"], // Allows theme selection in Storybook controls
//     },
//   },
// };

// type Story = StoryObj<typeof DummyTestComp>;

// // Light Theme Story
// // export const LightThemeStory: Story = {
// //   args: {
// //     theme: "light",
// //     ...flattenObj(defaultData.light), // Use light theme data
// //   },
// //   render: ({ theme }) => {
// //     const selectedThemeData = defaultData[theme as "light" | "dark"];
// //     return (
// //       <DummyTestComp
// //         {...(expandObj({ ...selectedThemeData }) as DummyTestProps)}
// //       />
// //     );
// //   },
// // };

// // // Dark Theme Story
// // export const DarkThemeStory: Story = {
// //   args: {
// //     theme: "dark",
// //     ...flattenObj(defaultData.dark), // Use dark theme data
// //   },
// //   render: ({ theme }) => {
// //     const selectedThemeData = defaultData[theme as "light" | "dark"];
// //     return (
// //       <DummyTestComp
// //         {...(expandObj({ ...selectedThemeData }) as DummyTestProps)}
// //       />
// //     );
// //   },
// // };

// export default meta;
