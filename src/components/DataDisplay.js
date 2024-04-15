import React, {useState} from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import GrossExpChart from './GrossExpChart';
import GrossInc from './GrossInc';
import NetBudget from './NetBudget';

// Display chart
function DataDisplay(){
   
    const [currComp, setCurrComp] = useState('netBudget');
    const [showCharts, setShowCharts] = useState(false); // State to track whether button to show feedback has been clicked


    // use setState to determine which chart is displayed using next btn
    const handleNext = () => {
        switch (currComp) {
            case 'netBudget':
                setCurrComp('grossExp');
                break;
            case 'grossExp':
                setCurrComp('grossInc');
                break;
            case 'grossInc':
                setCurrComp('netBudget');
                break;
            default:
                setCurrComp('netBudget');
        }
    };

    // use setState to determine which chart is displayed using prev btn
    const handlePrevious = () => {
        switch (currComp) {
            case 'netBudget':
                setCurrComp('grossExp');
                break;
            case 'grossExp':
                setCurrComp('grossInc');
                break;
            case 'grossInc':
                setCurrComp('netBudget');
                break;
            default:
                setCurrComp('netBudget');
        }
    };
    
    // returns component to render based on stat
    const renderComp = () => {
        switch (currComp) {
            case 'netBudget':
                return <NetBudget/>;
            case 'grossExp':
                return <GrossExpChart/>
            case 'grossInc':
                return <GrossInc/>
            default:
                return <NetBudget/>
        }
    }

    const handleShowCharts = () => {
        setShowCharts(!showCharts);
    }


    return(
        <Box sx={{ textAlign: 'center', justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '90%', 
        margin: 'auto', 
        padding: '10px', 
        borderRadius: 8,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
        }}>
        <Button variant="contained" color="secondary" size="medium" onClick={handleShowCharts} data-testid="showcharts">
                {showCharts ? "Hide spending data" : "Show spending data"}
        </Button>
        {showCharts && renderComp()}
        {showCharts && (
            <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                <Button variant='contained' sx={{ width: '120px' }} onClick={handlePrevious}>Previous</Button>
                <Button variant='contained' sx={{ width: '120px' }} onClick={handleNext}>Next</Button>
            </Box>
        )}
        </Box>
    )

}

export default DataDisplay;