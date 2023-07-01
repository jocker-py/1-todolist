import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "../Task";
import { v1 } from "uuid";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes:
  // https://storybook.js.org/docs/react/api/argtypes
  args: {
    changeTaskStatus: action("change Task status"),
    changeTaskTitle: action("change Task title"),
    removeTask: action("remove Task"),
    task: { id: v1(), title: "JS", isDone: false },
    todolistId: "some-id-todolist",
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDone: Story = {};

export const TaskIsDone: Story = {
  args: {
    task: {
      id: v1(),
      title: "CSS",
      isDone: true,
    },
  },
};
