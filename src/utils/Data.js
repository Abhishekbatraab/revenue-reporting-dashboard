
import {  collection, onSnapshot } from "@firebase/firestore";
import { db } from "../app/firebase";

export async function getRevenueData(){
    try {
        const revenueRef = collection(db, 'Revenue');
        let revenueData = [];
        onSnapshot(revenueRef, snapshot=>{
            snapshot.docs.map(doc=>{
                return revenueData.push(doc.data());
            })
            console.log("Revenue Data is ", revenueData);
            // return revenueData;
        })
       
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
}
