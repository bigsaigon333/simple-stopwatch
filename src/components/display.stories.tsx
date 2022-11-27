import { ComponentStory, ComponentMeta } from "@storybook/react";

import Display from "./display";

export default {
  title: "Components/Display",
  component: Display,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Display>;

const Template: ComponentStory<typeof Display> = (arguments_) => (
  <Display {...arguments_} />
);

export const Primary = Template.bind({});
Primary.args = {
  time: 8345,
};
