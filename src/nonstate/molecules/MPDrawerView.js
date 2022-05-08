import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GavelIcon from "@mui/icons-material/Gavel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const STYLE_BOX = { padding: 3 };
const STYLE_AVATAR = { width: 100, height: 100 };

function Address({ address, isSitting }) {
  if (!address) {
    return null;
  }
  address = address.replaceAll(",", ", ");
  const href =
    "https://www.google.com/maps/search/" +
    address.replaceAll(" ", "+").replaceAll("/", "+");

  const renderedAddress = address.split(", ").map(function (line, i) {
    return <div key={i}>{line}</div>;
  });

  const secondaryText = isSitting ? "Sitting" : "Not Sitting";
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href} target="_blank">
        <ListItemIcon>
          <HomeIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={renderedAddress} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}

function Phone({ phone, isSitting }) {
  if (!phone) {
    return null;
  }
  const href = "tel:" + phone;
  const secondaryText = isSitting ? "Sitting" : "Not Sitting";

  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href} target="_blank">
        <ListItemIcon>
          <PhoneIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={phone} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}

function Email({ email }) {
  if (!email) {
    return null;
  }

  const href = "mailto:" + email;
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href} target="_blank">
        <ListItemIcon>
          <EmailIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={email} />
      </ListItemButton>
    </ListItem>
  );
}

function Wikipedia({ searchText }) {
  if (!searchText) {
    return null;
  }

  const href =
    "https://en.wikipedia.org/w/index.php?search=" +
    searchText.replaceAll(" ", "+");
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href} target="_blank">
        <ListItemIcon>
          <TravelExploreIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={"Wikipedia"} />
      </ListItemButton>
    </ListItem>
  );
}

function Pariament({ id }) {
  const href = "https://www.parliament.lk/component/members/viewMember/" + id;
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={href} target="_blank">
        <ListItemIcon>
          <GavelIcon color="disabled" />
        </ListItemIcon>
        <ListItemText primary={"Parliment.LK"} />
      </ListItemButton>
    </ListItem>
  );
}

function QualificationsWidget({ title, body }) {
  if (!body) {
    return null;
  }
  return (
    <Card sx={{ maxWidth: 275, margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title} Qualifications
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
}

function ChipWidget({ content }) {
  if (!content) {
    return null;
  }
  if (content === "Other or Unknown") {
    return null;
  }
  if (content === "None") {
    return null;
  }
  return <Chip label={content} variant="outlined" />;
}

export default function MPDrawerView(props) {
  const { mp, i18n } = props;
  if (!mp) {
    return null;
  }
  return (
    <Box sx={STYLE_BOX}>
      <Avatar alt={mp.name} src={mp.imageURL} sx={STYLE_AVATAR} />
      <Typography variant="h5" display="block">
        {i18n.t(mp.firstNames)}
      </Typography>
      <Typography variant="h3" display="block">
        {i18n.t(mp.lastName)}
      </Typography>
      <Typography variant="subtitle2" display="block">
        {mp.ageAndDateOfBirth}
      </Typography>
      <Typography variant="overline" display="block">
        {i18n.t(mp.party)}
        {" - "}
        {i18n.t(mp.edName)}
      </Typography>

      <Stack direction="row" spacing={1}>
        <ChipWidget content={mp.profession} />
        <ChipWidget content={mp.civilStatus} />
        <ChipWidget content={mp.religion} />
      </Stack>

      <QualificationsWidget title="Academic" body={mp.academicQualifications} />
      <QualificationsWidget
        title="Professional"
        body={mp.professionalQualifications}
      />

      <List>
        <Phone phone={mp.phoneSitting} isSitting={true} />

        <Address address={mp.addressSitting} isSitting={true} />

        <Phone phone={mp.phone} />

        <Address address={mp.address} isSitting={false} />

        <Email email={mp.email} />

        <Pariament id={mp.id} />
        <Wikipedia searchText={mp.name} />
      </List>
    </Box>
  );
}
