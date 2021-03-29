import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MUIDataTable from "mui-datatables";
import {  getStockSymbols, getStockData, getStockPrice } from '../_actions/userActions';
import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


const PopoverForm = ({dataIndex}) => {

    console.log(dataIndex);
    const [allStocks, setAllStocks] = useState([]);
    
    const dummyData = [
      {
          "symbol": "TSM",
          "date": "2020-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 1339238429000,
          "gross_profit": 711130120000,
          "income_before_tax": 584777180000,
          "ebitda": 912206385000,
          "net_income": 517885387000,
          "eps": 99.85,
          "weighted_shares_outstanding": 5186076000,
          "long_term_debt": 256072695000,
          "free_cash_flow": 305885103000,
          "captial_expenditure": -516781109000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2019-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 1069988800000,
          "gross_profit": 492701900000,
          "income_before_tax": 389862100000,
          "ebitda": 679949400000,
          "net_income": 353948000000,
          "eps": 66.6,
          "weighted_shares_outstanding": 5186076000,
          "long_term_debt": 25100000000,
          "free_cash_flow": 145386600000,
          "captial_expenditure": -469752100000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2018-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 1031361800000,
          "gross_profit": 497874300000,
          "income_before_tax": 397543100000,
          "ebitda": 695255900000,
          "net_income": 363052700000,
          "eps": 67.7,
          "weighted_shares_outstanding": 5186076000,
          "long_term_debt": 56900000000,
          "free_cash_flow": 251272100000,
          "captial_expenditure": -322682200000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2017-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 977442600000,
          "gross_profit": 494826400000,
          "income_before_tax": 396161900000,
          "ebitda": 659664800000,
          "net_income": 344998300000,
          "eps": 66.15,
          "weighted_shares_outstanding": 5186076000,
          "long_term_debt": 91800000000,
          "free_cash_flow": 249429700000,
          "captial_expenditure": -335888500000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2016-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 947909200000,
          "gross_profit": 474832100000,
          "income_before_tax": 385921700000,
          "ebitda": 611649500000,
          "net_income": 331713700000,
          "eps": 64.45,
          "weighted_shares_outstanding": 5186076000,
          "long_term_debt": 153115400000,
          "free_cash_flow": 206740900000,
          "captial_expenditure": -333093700000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2015-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 843512500000,
          "gross_profit": 410394900000,
          "income_before_tax": 350477600000,
          "ebitda": 552604600000,
          "net_income": 302850900000,
          "eps": 59.1,
          "weighted_shares_outstanding": 5186057600,
          "long_term_debt": 191997600000,
          "free_cash_flow": 268078700000,
          "captial_expenditure": -261800700000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2014-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 762835000000,
          "gross_profit": 377722000000,
          "income_before_tax": 302073500000,
          "ebitda": 503934600000,
          "net_income": 254301400000,
          "eps": 50.9,
          "weighted_shares_outstanding": 5185854600,
          "long_term_debt": 213713800000,
          "free_cash_flow": 129124200000,
          "captial_expenditure": -292399500000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2013-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 597003300000,
          "gross_profit": 281360800000,
          "income_before_tax": 215961500000,
          "ebitda": 372121700000,
          "net_income": 183977600000,
          "eps": 36.3,
          "weighted_shares_outstanding": 5185555600,
          "long_term_debt": 210807600000,
          "free_cash_flow": 57038300000,
          "captial_expenditure": -290345200000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2012-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 506223600000,
          "gross_profit": 243594900000,
          "income_before_tax": 181554000000,
          "ebitda": 316624200000,
          "net_income": 166158800000,
          "eps": 32.05,
          "weighted_shares_outstanding": 5184147000,
          "long_term_debt": 81359400000,
          "free_cash_flow": 42926400000,
          "captial_expenditure": -246137400000,
          "sec_link": ""
      },
      {
          "symbol": "TSM",
          "date": "2011-12-31 00:00:00",
          "currency": "TWD",
          "revenue": 427080600000,
          "gross_profit": 194069200000,
          "income_before_tax": 145147700000,
          "ebitda": 251616000000,
          "net_income": 134201300000,
          "eps": 25.9,
          "weighted_shares_outstanding": 5182815200,
          "long_term_debt": 19587500000,
          "free_cash_flow": 33624500000,
          "captial_expenditure": -213962500000,
          "sec_link": ""
      }
  ]  

    // useEffect(()=>{
    //   const interval = setInterval(() => {
    //         console.log('Logs every minute');
    //         dispatchgetStockSymbols("Hello");
    //   }, MINUTE_MS )
    //   //console.log(376376);
    //   }, []);

    // useEffect(()=>{
    //     let tempList = [];
    //     if(symbolData && symbolData.stocksData){
    //         symbolData.stocksData.map(record => {
    //                                         if(record && record.name && record.symbol){
    //                                           tempList.push([
    //                                             record.name,           //0
    //                                             record.symbol          //1
    //                                           ]);
    //                                         }
    //         })
    //     }

    //     if(tempList && tempList.length > 0){
    //       setAllStocks(tempList);
    //     }

    // }, [symbolData]); 

    // console.log("symbolData.stocksData");
    // console.log(symbolData.stocksData);
   
    //const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Financial Data
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>The content of the Popover.</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
        );
}

const mapStateToProps = (state) => {   
  return {
      symbolData: state.stockSymbolsData
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchgetStockSymbols:(mesg) => dispatch(getStockSymbols(mesg))
   // updateUserProfileByManager:(oktaToken, managerOktaId, updateOktaId,userProfileData) => dispatch(updateUserProfileByManagerRestCall(oktaToken, managerOktaId, updateOktaId,userProfileData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopoverForm);

