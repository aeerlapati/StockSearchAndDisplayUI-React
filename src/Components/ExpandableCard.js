import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

export default function ExpandableCard({symbolData}) {
  const classes = useStyles();
  console.log(symbolData.stocksData);
  return (
    <div className={classes.root}>
        <Grid
           container
           spacing={2}
           direction="row"
           justify="flex-start"
           alignItems="flex-start"
         >
      {symbolData.stocksData.map((elem) => (
        // <Grid
        //   container
        //   spacing={2}
        //   direction="row"
        //   justify="flex-start"
        //   alignItems="flex-start"
        // >
        //   {symbolData.stocksData.map((elem) => (
            <Grid item xs={6} sm={3} key={symbolData.stocksData.indexOf(elem)}>
              <Card>
                <CardHeader
                  title={`${elem.stockName}`}
                  subheader={`Stock Symbol : ${elem.stockSymbol}`}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                  {elem.stockPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
    </Grid>
    </div>
  );
}
