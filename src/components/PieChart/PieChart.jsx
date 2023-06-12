import React, { useEffect, useState } from 'react';
import { ArcElement } from "chart.js";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './PieChart.css'

const PieChart = ({ revenueData, companiesRevenue }) => {
    console.log("Revenue Data in PieChart is ", revenueData);
    console.log("Companies Revenue in PieChart ", companiesRevenue);
    // const [chartData, setChartData] = useState({
    //     labels: companiesRevenue.map(data=>data.month), 
    //     datasets: [
    //         {
    //             label: "Amount",
    //             data: companiesRevenue.map(data => data.amount),
    //             backgroundColor: [
    //                 "rgba(75,192,192,1)",
    //                 "#ecf0f1",
    //                 "#50AF95",
    //                 "#f3ba2f",
    //                 "#2a71d0"
    //             ],
    //             borderColor: "black",
    //             borderWidth: 2
    //         }
    //     ]
    // });

    useEffect(()=>{
        
    },[])

    function setPieChartData(){
        return {
            labels: companiesRevenue.map(data=>data.month), 
            datasets: [
                {
                    label: "Amount",
                    data: companiesRevenue.map(data => data.amount),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0"
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }
            ]
        }
    }

    return (
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
          <div className='chart-box'>
            <Pie
                data={setPieChartData()}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: "Revenue Report for 1 year"
                    }
                }
                }}
            />
          </div>
        </div>
      );
}

export default PieChart