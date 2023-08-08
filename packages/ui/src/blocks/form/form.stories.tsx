import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/button"
import { Input } from "@/components/input"

import { Form } from "./form"

const formSchema = z
  .object({
    email: z.string().email("The provided email is invalid"),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

const FormDemo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-4">
            <Form.Field
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Input placeholder="admin@medusa-test.com" {...field} />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Password</Form.Label>
                  <Form.Control>
                    <Input type="password" {...field} />
                  </Form.Control>
                  <Form.Hint>
                    Password must be at least 8 characters long and contain at
                    least one uppercase character, one lowercase character, one
                    number, and one special character.
                  </Form.Hint>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
            <Form.Field
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control>
                    <Input type="password" {...field} />
                  </Form.Control>
                  <Form.ErrorMessage />
                </Form.Item>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

const meta: Meta<typeof FormDemo> = {
  title: "Blocks/Form",
  component: FormDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof FormDemo>

export const Default: Story = {}
