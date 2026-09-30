import type { Meta, StoryObj } from "@storybook/react-vite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormField from "./form-field";
import { TextInput } from "@/components/design-system/atoms";

const schema = z.object({
  email: z.string().min(1, "Required").email("Enter a valid email"),
});

type Values = z.infer<typeof schema>;

const meta = {
  title: "Design System/Molecules/FormField",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithValidation: Story = {
  render: () => {
    const form = useForm<Values>({
      resolver: zodResolver(schema),
      defaultValues: { email: "" },
      mode: "onBlur",
    });

    return (
      <form
        className="max-w-md space-y-4"
        onSubmit={form.handleSubmit(() => undefined)}
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          label="Email"
          hint="We will only use this to send a confirmation."
          required
        >
          {(field) => (
            <TextInput
              {...field}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          )}
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};
