import ContactForm from "@components/forms/Contact";
import { Breadcrumbs, Typography, Box, Link } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ContactEdit = () => {
  const router = useRouter();

  const submitForm = (data = {}) => {
    console.log(data);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Create User
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/dashboard" color="inherit" underline="hover">
            <Typography>Dashboard</Typography>
          </Link>
          <Link href="/contacts" color="inherit" underline="hover">
            <Typography>Contacts</Typography>
          </Link>
          <Typography>New Contact</Typography>
        </Breadcrumbs>
      </Box>

      <ContactForm submitForm={submitForm} />
    </Box>
  );
};

export default ContactEdit;
