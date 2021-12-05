import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./App.css";
import StockPickerWidget from "./Components/StockPickerWidget/StockPickerWidget";
import Header from "./Components/Header/Header";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
          <Item>
            <Header />
          </Item>
        </Grid>
        <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
          <Item>
            <StockPickerWidget />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
