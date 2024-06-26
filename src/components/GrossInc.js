import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Box, Typography} from '@mui/material';

function GrossInc(){

    // Figures taken from budget book 23-24
    const grossInc = [
        {sector: 'Wellbeing', spend: 126575, color:'#fc0c0c' },
        {sector: 'Child services', spend: 22291, color:'#0fb900'},
        {sector: 'Operations', spend: 125374, color: '#0012b9'},
        {sector: 'Resources', spend: 113327, color:'#a50aa8'},
        {sector: 'Executive', spend: 183, color:'#000000'}
    ];

    // create total of spend
    const total = () =>{
        let t = 0;
        for(let i = 0; i< grossInc.length; i++){
            t += grossInc[i].spend;
        }
        let y = t*1000;
        return y.toLocaleString();
    }

    // create legend for chart 
    const renderLegend = () => (
        <Box sx={{ display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '90%', 
        margin: 'auto', 
        padding: '10px'}}>
            <Typography variant="caption" >
                {grossInc.map((entry, index) => (
                    <span key={`legend-${index}`} style={{ color: entry.color}}>
                        {entry.sector}{index < grossInc.length - 1 ? ', ' : ''}
                    </span>
                ))}
                . (£000's)
            </Typography>
        </Box>
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
            <Box sx={{ margin:1 }}>
                <Typography variant="h6" gutterBottom>
                    Breakdown of gross income for 23/24: £{total()} in BCP
                </Typography>
                <Typography variant="caption" gutterBottom>
                    Figures taken from General Fund Budget Summary 2023/2024: https://www.bcpcouncil.gov.uk/documents/about-the-council/BCP-Council-Budget-Book-from-2023-to-2024.pdf
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart aria-label="pie-chart" width={375} height={400} margin ={0}>
                    <Pie 
                        data={grossInc}
                        dataKey={"spend"}
                        outerRadius={100}
                        label
                    >
                    {grossInc.map((entry, index) => (
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

export default GrossInc;