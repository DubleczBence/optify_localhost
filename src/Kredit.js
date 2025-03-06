import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const creditOptions = [
  { amount: 500, price: "10 000 Ft" },
  { amount: 1000, price: "20 000 Ft" },
  { amount: 2000, price: "40 000 Ft" },
];

const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  margin: 'auto',
  overflow: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '700px',
  },
  minHeight: '640px' // Magasság növelése
}));

const CreditPurchase = () => {
  return (
    <StyledCard
      variant="outlined"
      sx={{
        mt: 5,
        width: "95% !important",
        maxWidth: "700px !important",
        display: 'flex',
        alignItems: 'center',
        padding: 2
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
        Aktuális egyenleg <Typography component="span" fontWeight="bold" color="primary">120</Typography> Kredit
      </Typography>
      
      {['Havi feltöltés', 'Egyszeri feltöltés'].map((category, index) => (
        <Card key={index} sx={{ marginBottom: 1, boxShadow: 'none',    height:'100%',  width: '100%', backgroundColor: '#f5f5f5', padding: 2 }}>
          <CardContent sx={{ padding: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, textAlign: 'center' }}>
              Kredit vásárlása - {category}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {creditOptions.map((option, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Card variant="outlined" sx={{ 
                    textAlign: "center", 
                    padding: 1, 
                    border: "1px solid grey",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {option.amount}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>Kredit</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {option.price}
                    </Typography>
                    <Button variant="contained" size="small" sx={{ mt: 'auto' }}>Vásárlás</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </StyledCard>
  );
};

export default CreditPurchase;
