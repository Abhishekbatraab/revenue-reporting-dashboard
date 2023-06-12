import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { getUserDetails } from "../../slices/userSlice";
import {  collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../app/firebase";
// import { getRevenueData } from "../../utils/Data";
import PieChart from "../PieChart/PieChart";

const Dashboard = ( ) => {
    const [user,setUser] = useState({name: '', email: ''});
    const [revenueData, setRevenueData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('Apple');
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [companiesRevenue, setCompaniesRevenue] = useState([]);

    useEffect(()=>{
        console.log("Revenue data in dashboard is ", revenueData);
        const revenueRef = collection(db, 'Revenue');
        let revenueArray = [];
        onSnapshot(revenueRef, snapshot=>{
            snapshot.docs.map(doc=>{
                return revenueArray.push(doc.data());
            })
            console.log("Revenue Array is ", revenueArray);
            setCompanyYearlyData(revenueArray);
        })
        getUserDetails().then(userObject=>{
            console.log("user object in dashboard is ", userObject);
            setUser({
                name: userObject.name,
                email: userObject.email
            })
        })
    },[])
    console.log("Revenue Data is ",revenueData);

    function setCompanyYearlyData(revenueArray){
        const output = [];
        
        revenueArray.forEach(revenue=>{
            if(revenue.Company===selectedCompany && revenue.Country===selectedCountry){
                console.log("Selected revenue in forEach is ", revenue);
                for(var o in revenue) {
                    // console.log("o is ", o);
                    if(o!=='Company' && o!=='Country'){
                        let obj = {};
                        obj['month'] = o;
                        obj['amount'] = revenue[o];
                        output.push(obj);
                    }
                }
            }   
        })
        console.log("Output is ",output);
        setCompaniesRevenue(output);
    }
    return (
        <Container>
            <div>
                <h1>Welcome to Revenue Report Dashboard</h1>
            </div>
            <div>
                <h2>Welcome {user && user.name}</h2>
            </div>
            <div>Yearly Data for {selectedCompany} and {selectedCountry} :</div>
            <PieChart companiesRevenue={companiesRevenue} />
        </Container>
    )
}

export default Dashboard