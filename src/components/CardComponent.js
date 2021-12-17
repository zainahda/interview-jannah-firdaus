import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DraftsIcon from "@mui/icons-material/Drafts";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      flexGrow: 1,
      marginTop: 100,
    },
    card: {
      margin: "0px 10px 20px 10px",
    }
  };
});

const CardComponent = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get(`https://randomuser.me/api/?results=12`).then((res) => {
      setUsers(res.data.results);
    });
  };

  return (
    <Container className={classes.page}>
      <Grid container>
        {users.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }} className={classes.card}>
              <CardMedia
                component="img"
                alt={item.name.first}
                height="300"
                image={item.picture.medium}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name.title}. {item.name.first} {item.name.last}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <DraftsIcon/>
                  <Typography variant="body2" color="text.secondary">
                    {item.email}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <PhoneAndroidIcon />
                  <Typography variant="body2" color="text.secondary">
                    {item.phone}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardComponent;
