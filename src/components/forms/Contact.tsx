import RoundedCard from "@components/cards/RoundedCard";
import HookTextField from "@components/hookFormFields/HookTextField";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { normalizePhoneNumber } from "src/utils/helperFunctions";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  clientStatus: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  clientStatus: "",
};

const ContactForm = ({ values, submitForm }) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: { ...defaultValues },
    mode: "onChange",
  });

  const { handleSubmit, reset, setValue } = form;

  useEffect(() => {
    reset({ ...defaultValues, ...values });
  }, [values]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        submitForm?.(data);
      })}
    >
      <Grid container spacing={3}>
        {/* Left Card */}
        <Grid item xs={12} md={6} lg={4}>
          <RoundedCard></RoundedCard>
        </Grid>

        {/* Right Form */}
        <Grid item xs={12} md={6} lg={8}>
          <RoundedCard>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <HookTextField
                  name="firstName"
                  label="First Name"
                  form={form}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <HookTextField
                  name="lastName"
                  label="Last Name"
                  form={form}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <HookTextField
                  name="phone"
                  label="Phone"
                  type="phone"
                  form={form}
                  onChange={(e) => {
                    e.target.value = normalizePhoneNumber(e.target.value);
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <HookTextField
                  name="email"
                  label="Email"
                  disabled
                  form={form}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <HookTextField
                  name="clientStatus"
                  label="Client Status"
                  disabled
                  form={form}
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12} md={6}></Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Save
                </Button>
              </Grid>
            </Grid>
          </RoundedCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
