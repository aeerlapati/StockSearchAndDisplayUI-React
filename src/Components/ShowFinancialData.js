  import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
  import AssignmentIcon from '@material-ui/icons/Assignment';
  import MUIDataTable from "mui-datatables";
  import {  getStockSymbols, getStockData, getStockPrice } from '../_actions/userActions';
  import React,{useState, useEffect} from 'react';
  import { connect } from 'react-redux';
  import PopoverForm from './PopoverForm';
  import { Paper } from '@material-ui/core';
  import { withStyles } from '@material-ui/core/styles';
  import Chip from '@material-ui/core/Chip';
  import Dialog from '@material-ui/core/Dialog';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogActions from '@material-ui/core/DialogActions';
  import CloseIcon from '@material-ui/icons/Close';
  import '../SetAppConfig/splash-screen.css';
  import simpleNumber from './simpleNumber';

  const ShowFinancialData = ({dataIndex, dispathGetStocksPerformaceData, getFinanceDataError, financeData, dialogopen}) => {

      const [open, setOpen] = React.useState(dialogopen);
      
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const overrideMuiTableTheme = createMuiTheme({
          overrides: {
          MuiTableRow: {
              root: {
                backgroundColor: 'white',
                fontSize: '1000px !important',
              },
              hover: {
                backgroundColor: 'white',
              },
            },
            MuiTableCell: {
              root: {
                backgroundColor: 'white',
                fontSize: '15px',
              }
            },
            MuiHeadCell:{
              root: {
                  backgroundColor: 'white',
                  fontSize: '15px',
              },
              // hover: {
              //    backgroundColor: 'white',
              // },
            }
          }
        });

      const [allStocks, setAllStocks] = useState([]);
      
      const baseColumns = [
          {
            name: "Stock Name",
            options: {
              filter: true,
              display: true
            }
          },
          {
            name: "currency",
            options: {
              filter: true,
            }
          }, 
          {
            name: "revenue",
            options: {
              filter: true,
            }
          },
          {
            name: "Gross Profit",
            options: {
              filter: true,
            }
          },
          {
            name: "Net Income Before Tax",
            options: {
              filter: true,
            }
          },
        
          {
            name: "Ebitda",
            options: {
              filter: true,
            }
          },
          {
            name: "Net Income",
            options: {
              filter: true,
            }
          },
          {
            name: "EPS",
            options: {
              filter: true,
            }
          },
          {
            name: "Weighted Shares Outstanding",
            options: {
              filter: true,
            }
          },
          {
            name: "Long Term Debt",
            options: {
              filter: true,
            }
          },
          {
            name: "Free Cash Flow",
            options: {
              filter: true,
            }
          },
          {
            name: "Capital Expenditure",
            options: {
              filter: true,
            }
          }
      ];

      const options = {
          filter: true,
          filterType: 'dropdown',
          responsive: 'standard',
          selectableRows: 'none',
          expandableRows: false,
          expandableRowsHeader: false,
          expandableRowsOnClick: false,
          rowsPerPage:7
      };

      const MINUTE_MS = 60000;

      useEffect(()=>{
          if(open){
            dispathGetStocksPerformaceData(dataIndex[1]);
          }
        }, [open]);

      useEffect(()=>{

          let tempList = [];
          
          if(getFinanceDataError === "" && financeData !=='' && financeData.data !== ''){
            if(financeData !== '' && Object.keys(financeData.data).length > 0 && financeData.data[0].financeInfoPayload !== '' && financeData.data[0].financeInfoPayload !== 'NA'){

              let tempObject = JSON.parse(financeData.data[0].financeInfoPayload);
              tempObject.map(record => 
              {
                                            if(record !==''){
                                              tempList.push([
                                                financeData.data[0].stockSymbol,
                                                record.currency,                    //1
                                                simpleNumber(record.revenue),                     //2
                                                simpleNumber(record.gross_profit),                //3
                                                simpleNumber(record.income_before_tax),           //4
                                                simpleNumber(record.ebitda),                      //5
                                                simpleNumber(record.net_income),                  //6
                                                record.epsl,                        //7
                                                simpleNumber(record.weighted_shares_outstanding), //8
                                                simpleNumber(record.long_term_debt),              //9
                                                simpleNumber(record.free_cash_flow),              //10
                                                simpleNumber(record.captial_expenditure)          //11
                                              ]);
                                            }
            })

            }
          }

          if(tempList && tempList.length > 0){
            setAllStocks(tempList);
          }

      }, [financeData, getFinanceDataError]); 
    
      return(

        financeData && financeData.loading ?

              <div style={{position: 'fixed',top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="splash-screen">
                    Loading...
                    <div className="loading-dot">.</div>
              </div>

        :

        <div >
              <Chip style={{backgroundColor:'#2196f3', color:'white', padding:'5px', height:'30px', margin:'5px', fontSize:'13px'}} label={"Performace"} onClick={handleClickOpen}/>   
              <Paper style={{maxWidth:'1000px'}}>
                  <Dialog maxWidth='xl' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">
                                    Performace
                                    <CloseIcon style={{float:"right"}} onClick={() => handleClose()} />
                          </DialogTitle>
                  <DialogContent>
                      {getFinanceDataError ?
                              <h2>Apologies! Failed to retrieve the requested Information, Please try again after sometime.</h2>
                        :
                            <MuiThemeProvider theme={overrideMuiTableTheme}>
                                  <MUIDataTable data={allStocks} columns={baseColumns} options={options} title={<div style={{background:'white', fontSize:'1.75em', fontWeight:'bold', color:'#30465f', marginLeft:'-9px', float:'left'}} > <AssignmentIcon fontSize="small"></AssignmentIcon> Stocks Financial Stats</div>} />
                            </MuiThemeProvider>
                      }
                  </DialogContent>
                  </Dialog>
              </Paper>
          </div>
          );
  }

  const mapStateToProps = (state) => {   
    return {
        financeData: state.stockPerformaceData,
        getFinanceDataError: state.stockPerformaceData.error,

      };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      dispathGetStocksPerformaceData:(symbol) => dispatch(getStockData(symbol)),
    // updateUserProfileByManager:(oktaToken, managerOktaId, updateOktaId,userProfileData) => dispatch(updateUserProfileByManagerRestCall(oktaToken, managerOktaId, updateOktaId,userProfileData))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ShowFinancialData);

