import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Box, Typography} from '@mui/material';

function NetBudget(){

    // Figures taken from budget book 23-24
    const netBudget = [
        {sector: 'Wellbeing', spend: 124563, color:'#fc0c0c' },
        {sector: 'Child services', spend: 86092, color:'#0fb900'},
        {sector: 'Operations', spend: 73783, color: '#0012b9'},
        {sector: 'Resources', spend: 29896, color:'#a50aa8'},
        {sector: 'Executive', spend: 927, color:'#000000'}
    ];

    // create total of spend
    const total = () =>{
        let t = 0;
        for(let i = 0; i< netBudget.length; i++){
            t += netBudget[i].spend;
        }
        let y = t*1000;
        return y.toLocaleString();
    }

    // create legend for chart 
    const renderLegend = () => (
        <Typography variant="caption" gutterBottom>
          {netBudget.map((entry, index) => (
            <span key={`legend-${index}`} style={{ color: entry.color }}>
              {entry.sector}{index < netBudget.length - 1 ? ', ' : ''}
            </span>
          ))}
          . (£000's)
        </Typography>
      );
    
    // create tooltip with data in sector and spend
    const renderTooltip = (data) => {
        if (data.payload && data.payload[0]) {
            const sector = data.payload[0].payload.sector;
            const spend = data.payload[0].value;
            return (
                <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                    <p><strong>{sector}</strong>: £{spend.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return(
        <Box>
            <Box>
                <Typography variant="h6" gutterBottom>
                    Breakdown of net budget for 23/24: £{total()} in BCP
                </Typography>
                <Typography variant="caption" gutterBottom>
                    Figures taken from General Fund Budget Summary 2023/2024: https://www.bcpcouncil.gov.uk/documents/about-the-council/BCP-Council-Budget-Book-from-2023-to-2024.pdf
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={500} height={300} margin ={0}>
                    <Pie 
                        data={netBudget}
                        dataKey={"spend"}
                        outerRadius={100}
                        label
                    >
                    {netBudget.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>  
                    <Tooltip content={renderTooltip}/>
                    <Legend content={renderLegend} />
                </PieChart>
            </Box>
        </Box>
    )

}

export default NetBudget;