import ContactForm from "@components/forms/Contact";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { editFirestoreDoc, getFirestoreDoc } from "src/api/common";
import { useFirestore } from "src/hooks/firebase";

const name = "contacts";

const ContactEdit = () => {
  const [contact, setContact] = useState({});
  const [fetching, setFetching] = useState(true);

  const router = useRouter();
  const { cid } = router.query;
  const db = useFirestore();

  useEffect(() => {
    if (cid) {
      const _contact = getFirestoreDoc(db, name, cid, (data) => {
        setContact(data || {});
        setFetching(false);
      });

      return () => _contact();
    }
  }, []);

  const submitForm = (data = {}) => {
    editFirestoreDoc(db, name, cid, data, () => router.back());
  };

  if (!contact.id && !fetching) return <div>User not found</div>;

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
          <Typography>
            {contact.firstName} {contact.lastName}
          </Typography>
        </Breadcrumbs>
      </Box>

      <ContactForm values={contact} submitForm={submitForm} />
    </Box>
  );
};

export default ContactEdit;
