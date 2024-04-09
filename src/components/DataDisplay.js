import React, {useState} from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import GrossExpChart from './GrossExpChart';
import GrossInc from './GrossInc';
import NetBudget from './NetBudget';

// Display chart
function DataDisplay(){
   
    const [currComp, setCurrComp] = useState('netBudget');

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


    return(
        <Box sx={{ textAlign: 'center', justifyContent: 'space-between', marginLeft: '50px', marginRight: '50px' }}>
            
            {renderComp()}
                
            <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', marginRight: '50px' }}>
                <Button variant='contained' onClick={handlePrevious}>Previous</Button>
                <Button variant='contained' onClick={handleNext}>Next</Button>
            </Box>
        </Box>
    )

}

export default DataDisplay;