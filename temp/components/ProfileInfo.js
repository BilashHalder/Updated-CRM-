// ** React Imports
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Chip,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  AlertTitle,
  CardContent,
  FormControl,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import EmailIcon from "@mui/icons-material/Email";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import TagIcon from "@mui/icons-material/Tag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WcIcon from "@mui/icons-material/Wc";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ProfileInfo = (props) => {
  const {
    id,
    name,
    email,
    phone,
    image,
    referral_key,
    balance,
    status,
    gender,
  } = props.data;

  return (
    <CardContent>
      {id ? (
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={6} md={4} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ImgStyled
                  src={`http://localhost:9000/uploads/images/${image}`}
                  alt={name}
                />
                <Typography>{name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <SettingsCellIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <TagIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={referral_key}
                    secondary="Referral Id"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={6} md={4}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`₹  ${parseFloat(balance)}`} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <StarBorderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                  <Chip label={status==1?"Active":"De-Active"} color={status==1?"success":"error"}  />
                  </ListItemText>
                 
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WcIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      gender == 1 ? "Male" : gender == 2 ? "Female" : "Others"
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </CardContent>
  );
};

export default ProfileInfo;
