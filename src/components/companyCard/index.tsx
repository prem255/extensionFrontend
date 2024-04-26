import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SellIcon from "@mui/icons-material/Sell";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 376,
  position: "relative",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));
const insertUrl = "http://localhost:8000/api/v1/company/insert";

function uploadData(data: any) {
  fetch(insertUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error:", error);
    });
}

const CompanyCard = ({ data }: { data: any }) => {
  if (data.name && data.Website) uploadData(data);
  const handleCloseClick = () => {
    // Close the extension tab
    window.close();
  };
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const {
    name,
    Website: website,
    Founded: founded,
    HeadQuarters: hq,
    "Company size": emp,
    Overview: desc,
    img,
    Industry: category,
    Specialties: specs,
    Phone: phone,
  } = data;
  // let response = await addCompanyData(data);
  // setError(response.status);
  function handleClose() {
    setOpen(false);
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <StyledCard>
      <CloseButton aria-label="close" onClick={handleCloseClick}>
        <CloseIcon />
      </CloseButton>

      <CardContent>
        {img && (
          <Box sx={{ display: "flex", justifyContent: "left", mb: 2 }}>
            <img src={img} alt="Airbnb Logo" style={{ width: 64 }} />
          </Box>
        )}
        {name && (
          <Typography variant="h5" component="div" gutterBottom>
            {name}
          </Typography>
        )}
        {desc && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {desc}
          </Typography>
        )}
        {website && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <LanguageIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Link
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="primary"
                variant="body2"
                gutterBottom
              >
                {website}
              </Link>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Website
              </Typography>
            </Grid>
          </Grid>
        )}
        {phone && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <LocalPhoneIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {phone}
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Phone
              </Typography>
            </Grid>
          </Grid>
        )}
        {emp && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <GroupIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Employees
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {emp}
              </Typography>
            </Grid>
          </Grid>
        )}
        {category && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <ApartmentIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Industry
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {category}
              </Typography>
            </Grid>
          </Grid>
        )}
        {specs && specs.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <SellIcon fontSize="small" />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Specialities
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              {specs.split(",").map((spec: string, index: number) => (
                <Chip
                  key={index}
                  label={spec}
                  style={{
                    fontSize: "14px",
                    height: "18px",
                    margin: "2px",
                  }}
                />
              ))}
            </Grid>
          </Grid>
        )}
        {hq && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <SellIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                HeadQuarter
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {hq}
              </Typography>
            </Grid>
          </Grid>
        )}
        {founded && (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <SellIcon fontSize="small" />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Founded
              </Typography>
            </Grid>

            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {founded}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CompanyCard;
