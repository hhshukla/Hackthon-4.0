// Globals
import type { Meta, StoryObj } from "@storybook/react";
// components
import DummyTestComp, {
  DummyTestProps,
} from "@/Components/DummyComponent/DummyTest";
// libs
import { expandObj, flattenObj } from "lib/object-parser";
// mock
import { defaultData } from "./DummyTest";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DummyTestComp> = {
  title: "Components/DummyComponent/DummyTest",
  component: DummyTestComp,
};

type Story = StoryObj<typeof DummyTestComp>;

export const FirstStory: Story = {
  args: flattenObj(defaultData),
  render: (props) => {
    return <DummyTestComp {...(expandObj({ ...props }) as DummyTestProps)} />;
  },
};

export default meta;
