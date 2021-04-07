import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AttachMoney from '@material-ui/icons/AttachMoneyTwoTone';
import MUIDataTable from "mui-datatables";
import {  getStockSymbols, getStockData, getStockPrice } from '../_actions/userActions';
import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PopoverForm from './PopoverForm';
import ShowFinancialData from './ShowFinancialData';
import Chip from '@material-ui/core/Chip';
import '../SetAppConfig/splash-screen.css';
import ExpandableCard from './ExpandableCard'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const DashBoard = ({dispatchgetStockSymbols, symbolData}) => {

    const overrideMuiTableTheme = createMuiTheme({
        overrides: {
         MuiTableRow: {
            root: {
              fontSize: '1000px !important',
            },
            hover: {
            },
           },
           MuiTableCell: {
            root: {
              fontSize: '15px',
            }
          }
            // hover: {
            //    backgroundColor: 'white',
            // },
        }
      });

    const [allStocks, setAllStocks] = useState([]);
    
  //   const dummyData = [
  //     [
  //         "Apple Inc.",
  //         "AAPL"
  //     ],
  //     [
  //         "Taiwan Semiconductor Manufacturing Company Limited",
  //         "TSM"
  //     ],
  //     [
  //         "Gamestop Inc.",
  //         "GME"
  //     ],
  //     [
  //         "Roku Inc",
  //         "ROKU"
  //     ],
  //     [
  //         "General Motors",
  //         "GM"
  //     ],
  //     [
  //         "Leslie Pools",
  //         "LESL"
  //     ],
  //     [
  //         "Pool Corporation",
  //         "POOL"
  //     ]
  // ]
    const baseColumns = [
        {
          name: "Stock Name",
          options: {
            filter: true,
            display: true
          }
        }, 
        {
          name: "Symbol",
          options: {
            filter: true,
          }
        },
        {
          name: "Price",
          options: {
            filter: false,
          }
        },
         {
           name: "More Information",
           options: {
             filter: false,
             sort: false,
             customBodyRenderLite: (dataIndex) => {
               return (
                  //<Chip style={{backgroundColor:'#5A8E22', color:'white', padding:'5px', height:'25px', float:'left', marginLeft:'20px', marginBottom:'20px'}} label="Edit" />
                  <ShowFinancialData dataIndex={allStocks[dataIndex]} dialogopen={false} ></ShowFinancialData> 
               );
             }
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
    };

    const MINUTE_MS = 60000;

    useEffect(()=>{

      dispatchgetStockSymbols();


      // const interval = setInterval(() => {
      //       console.log('Logs every minute');
      // }, MINUTE_MS )
      //console.log(376376);
    }, []);

    
    
     useEffect(async ()=>{
       try {
         setInterval(async () => {
           dispatchgetStockSymbols();
         }, 60000);
       } catch(e) {
         console.log(e);
       }
     }, []);

    useEffect(()=>{
        let tempList = [];
        if(symbolData && symbolData.stocksData){
            symbolData.stocksData.map(record => {
                                            if(record !=='' && record.stockname !== '' && record.stocksymbol != ''){
                                              tempList.push([
                                                record.stockName,           //0
                                                record.stockSymbol,         //1
                                                record.stockPrice           //2
                                              ]);
                                            }
            })
        }

        if(tempList && tempList.length > 0){
          setAllStocks(tempList);
        }

    }, [symbolData]); 

     console.log("symbolData.stocksData");
     console.log(symbolData.stocksData);

     const [view, setView] = React.useState('list');
    
     const [listBGcolor, setListBGcolor] = React.useState('');
     const [moduleBGcolor, setModuleGcolor] = React.useState('');

     const handleChange = (event, nextView) => {
      if( nextView !== null){
        setView(nextView);
        if(nextView=== 'list'){
          setListBGcolor('green');
          setModuleGcolor('');
        }else{
          setListBGcolor('');
          setModuleGcolor('green');
        }
      }
     };

  


   
    return(
       symbolData && view !== '' && symbolData.loading ?
    
       <div style={{position: 'fixed',top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="splash-screen">
            <b style={{fontSize:'2.8em'}}>Loading...</b>
            <div className="loading-dot">.</div>
       </div>


        :

        <>
                   
                   <div>
                        <ToggleButtonGroup style={{float:'right', marginRight:'15px',margintop:'20px'}} orientation="horizontal" value={view} exclusive onChange={handleChange}>
                        <ToggleButton style={{color:'white',backgroundColor:listBGcolor}} value="list" aria-label="list">
                          <ViewListIcon/>
                        </ToggleButton>
                        <ToggleButton style={{color:'white',backgroundColor:moduleBGcolor}} value="module" aria-label="module">
                          <ViewModuleIcon />
                        </ToggleButton>
                      </ToggleButtonGroup>
                  </div>

                  {view === 'list' ?

                    <div style={{marginTop:"100px", marginLeft:"30px", marginRight:"30px"}}>
                        <MuiThemeProvider theme={overrideMuiTableTheme}>
                          <MUIDataTable data={allStocks} columns={baseColumns} options={options} title={<div style={{background:'white', fontSize:'1.75em', fontWeight:'bold', color:'#30465f', marginLeft:'-9px', float:'left'}} > <AttachMoney style={{color:'black'}}fontSize="small"></AttachMoney> Stocks</div>} />
                        </MuiThemeProvider> 
                    
                    </div>
                  
                    : 
                    
                    view === 'module' &&
                      <div  style={{marginTop:"100px"}}>
                            {symbolData && symbolData.stocksData &&
                            <ExpandableCard symbolData={symbolData}/>
                            }
                      </div>
                      
                    }

      </>
    );
}

const mapStateToProps = (state) => {   
  return {
      symbolData: state.stockSymbolsData
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchgetStockSymbols:() => dispatch(getStockSymbols())
   // updateUserProfileByManager:(oktaToken, managerOktaId, updateOktaId,userProfileData) => dispatch(updateUserProfileByManagerRestCall(oktaToken, managerOktaId, updateOktaId,userProfileData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

