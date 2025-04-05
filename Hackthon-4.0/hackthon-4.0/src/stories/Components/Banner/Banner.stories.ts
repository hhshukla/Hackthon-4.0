import type { Meta, StoryObj } from "@storybook/react";
import "@/styles/globals.css"; // Import global styles
import Banner from "../../../Components/Banner/Banner";

const meta = {
  title: "Example/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = {
  title1: "Welcome to Our Platform",
  title2: "Empowering Your Business",
  description:
    "Explore our suite of tools designed to help you grow and succeed in a competitive landscape.",
  buttonText1: "Get Started",
  buttonText2: "Learn More",
  img: "https://thefusioneer.com/wp-content/uploads/2023/11/5-AI-Advancements-to-Expect-in-the-Next-10-Years-scaled.jpeg", // Replace with a real image URL or mock
};

export const Primary: Story = {
  args: {
    ...commonArgs,
    primary: true,
    position: "center",
  },
};

export const Left: Story = {
  args: {
    ...commonArgs,
    position: "left",
    backgroundColor: "#f0f8ff",
  },
};

export const Right: Story = {
  args: {
    ...commonArgs,
    position: "right",
    backgroundColor: "#f0f8ff",
  },
};
