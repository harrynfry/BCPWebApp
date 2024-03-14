import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

// Display data in a chart
function DataDisplay(){

    const data = [
        {sector: 'Wellbeing', spend: 124563, color:'#FF5733' },
        {sector: 'Child services', spend: 86092, color:'#FFC300'},
        {sector: 'Operations', spend: 73783, color: '#043ae4'},
        {sector: 'Resources', spend: 28896, color:'#C70039'},
        {sector: 'Executive', spend: 927, color:'#04e4b8'}
    ];

    const total = () =>{
        let t = 0;
        for(let i = 0; i< data.length; i++){
            t += data[i].spend;
        }
        return t;
    }

    // Define an array of colors for each slice
        
    const renderLegend = () => (
        <ul>
        {data.map((entry, index) => (
            <li key={`legend-${index}`} style={{ color: entry.color }}>
            {entry.sector}
            </li>
        ))}
        </ul>
    );    
    
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <div>
                <h4 style ={{textAlign:'center'}}>Breakdown of net spending of £{total()} (£000) in BCP</h4>
                <PieChart width={500} height={500}>
                    <Pie 
                        data={data}
                        dataKey={"spend"}
                        outerRadius={150}
                        label
                    >
                    {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend content={renderLegend} />
                    </PieChart>
            </div>
        </div>
    )
}

export default DataDisplay;