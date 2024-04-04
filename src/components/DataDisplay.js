import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Box, Typography} from '@mui/material';

// Display data in a chart
function DataDisplay(){

    const grossExp = [
        {sector: 'Wellbeing', spend: 251138, color:'#fc0c0c' },
        {sector: 'Child services', spend: 108383, color:'#0fb900'},
        {sector: 'Operations', spend: 199157, color: '#0012b9'},
        {sector: 'Resources', spend: 143223, color:'#a50aa8'},
        {sector: 'Executive', spend: 1110, color:'#000000'}
    ];

    const total = () =>{
        let t = 0;
        for(let i = 0; i< grossExp.length; i++){
            t += grossExp[i].spend;
        }
        return t;
    }

    // Define an array of colors for each slice
        
    const renderLegend = () => (
        <Typography variant="caption" gutterBottom>
          {grossExp.map((entry, index) => (
            <span key={`legend-${index}`} style={{ color: entry.color }}>
              {entry.sector}{index < grossExp.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Typography>
      );
    
    return(
        <Box sx={{ textAlign: 'center' }}>
            <Box>
            <Typography variant="h6" gutterBottom>
                Breakdown of gross expenditure of £{total()} (£000) in BCP
            </Typography>
            <Typography variant="caption" gutterBottom>
                Figures taken from General Fund Budget Summary 2023/2024: https://www.bcpcouncil.gov.uk/documents/about-the-council/BCP-Council-Budget-Book-from-2023-to-2024.pdf
            </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={500} height={300} margin ={0}>
                    <Pie 
                        data={grossExp}
                        dataKey={"spend"}
                        outerRadius={100}
                        label
                    >
                    {grossExp.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>  
                    <Legend content={renderLegend} />
                </PieChart>
            </Box>
        </Box>
    )

}

export default DataDisplay;