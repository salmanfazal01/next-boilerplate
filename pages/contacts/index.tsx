import RoundedCard from "@components/cards/RoundedCard";
import { AddOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import DbTableList from "src/containers/lists/DbTableList";
import { withProtected } from "src/hoc/routes";

const Contacts = (props) => {
  const RenderHeader = () => (
    <>
      <Stack spacing={2} direction="row" alignItems="center" flexWrap="nowrap">
        <Stack sx={{ minWidth: 250, flex: 6 }}>
          <Typography>Name</Typography>
        </Stack>

        <Stack sx={{ minWidth: 50, flex: 1 }} alignItems="center">
          <Typography>Verified</Typography>
        </Stack>

        <Stack sx={{ minWidth: 95, flex: 1 }} alignItems="center">
          <Typography>Client Status</Typography>
        </Stack>

        <Stack sx={{ minWidth: 220, flex: 4 }} alignItems="flex-end">
          <Typography>Actions</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />
    </>
  );

  const renderItem = (item, idx, _length) => {
    return (
      <Stack
        key={idx}
        spacing={2}
        direction="row"
        alignItems="center"
        flexWrap="nowrap"
      >
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          sx={{ minWidth: 250, flex: 6 }}
        >
          <Avatar src={item.profilePicture} />

          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              {item.firstName} {item.lastName}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 300 }}>
              {item.email}
            </Typography>
          </div>
        </Stack>

        <Stack alignItems="center" sx={{ minWidth: 50, flex: 1 }}>
          <Typography>{item.verified || "No"}</Typography>
        </Stack>

        <Stack alignItems="center" sx={{ minWidth: 50, flex: 1 }}>
          <Chip label={item.clientStatus} variant="filled" color="primary" />
        </Stack>

        <Stack
          spacing={1}
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          sx={{ minWidth: 220, flex: 4 }}
        >
          <Button size="small" variant="contained" color="success">
            View
          </Button>
          <Link href={`/contacts/edit/${item.id}`}>
            <Button size="small" variant="contained" color="warning">
              Edit
            </Button>
          </Link>
          <Button size="small" variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </Stack>
    );
  };

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h6">Contacts</Typography>

        <Link href="/contacts/create">
          <Button variant="contained">
            <AddOutlined /> Add User
          </Button>
        </Link>
      </Stack>

      <RoundedCard>
        <DbTableList
          name="contacts"
          RenderHeader={RenderHeader}
          renderItem={renderItem}
        />
      </RoundedCard>
    </div>
  );
};

export default withProtected(Contacts);
