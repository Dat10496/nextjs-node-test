"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardDescription } from "@/components/ui/card";
import { createLead } from "@/config/api-request";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  email: "",
  status: "",
};

const createLeadSchema = yup.object().shape({
  email: yup.string().required("Not empty").email("Invalid email"),
  name: yup.string().required("Not empty"),
  status: yup.string().required("Not empty"),
});

const SELECT = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

function CreateLeadForm() {
  const [error, setError] = useState<string | null>();

  const methods = useForm({
    resolver: yupResolver(createLeadSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: {
    name: string;
    email: string;
    status: string;
  }) => {
    const { name, email, status } = data;
    const result = await createLead({ name, email, status });

    if (result.success) {
      toast("Lead has been created", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      reset();
      setError("");
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <CardDescription className="text-red-600 italic font-semibold">
              {error === "Unknown" ? "Network Error" : error}
            </CardDescription>
          )}
          <div className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...methods.register("name")}
                  name="name"
                  type="text"
                  placeholder="Your name.."
                  required
                  className="rounded border-text_secondary shadow"
                />
                {methods.formState.errors.name && (
                  <p className="text-red-500 text-sm italic">
                    {methods.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...methods.register("email")}
                  name="email"
                  type="email"
                  required
                  placeholder="Your email.."
                  className="rounded border-text_secondary shadow"
                />
                {methods.formState.errors.email && (
                  <p className="text-red-500 text-sm italic">
                    {methods.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2 ">
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={methods.control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => field.onChange(value)}
                      required
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {SELECT.map((el) => (
                          <SelectItem value={el} key={el}>
                            {el}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {methods.formState.errors.status && (
                  <p className="text-red-500 text-sm italic">
                    {methods.formState.errors.status.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-gray-600  rounded  hover:shadow text-white hover:text-black hover:cursor-pointer hover:bg-gray-300"
                variant="secondary"
              >
                CREATE
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default CreateLeadForm;
