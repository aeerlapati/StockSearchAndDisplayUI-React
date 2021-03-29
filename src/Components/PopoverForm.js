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

