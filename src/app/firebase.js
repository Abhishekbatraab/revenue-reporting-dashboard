import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc, getDocs, collection, query, onSnapshot } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId
// };

const firebaseConfig = {
    apiKey: "AIzaSyBIG9fqRyXzGniFWP9-cdEWSNFZvusZ2aA",
    authDomain: "revenue-reporting-dashboard.firebaseapp.com",
    projectId: "revenue-reporting-dashboard",
    storageBucket: "revenue-reporting-dashboard.appspot.com",
    messagingSenderId: "496978717156",
    appId: "1:496978717156:web:dc7eecd3b39ff4b8213ff1",
    measurementId: "G-ETKD1N7RYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// try {
//     // const revenueRef = db.collection('Revenue');
//     // const snapshot = await revenueRef.get();
//     // snapshot.forEach(doc => {
//     //     console.log(doc.id, '=>', doc.data());
//     // });
//     const revenueRef = collection(db, 'Revenue');
//     const revenueData = [];
//     onSnapshot(revenueRef, snapshot=>{
//         snapshot.docs.map(doc=>{
//             console.log("Doc is ", doc.data());
//             revenueData.push(doc.data());
//         })
//         console.log("Revenue Data is ", revenueData);
//     })
// } catch (err) {
//     console.error(err);
//     alert("An error occured while fetching user data");
// }

export const auth = getAuth();
console.log('auth in firebase ', auth);
auth.useDeviceLanguage();

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithRedirect(auth, googleProvider);
}

export const setUserIntoDB = async (user) => {
    console.log("User in setUserIntoDB ", user);
    return await setDoc(doc(db, "users", "user"), {
        name: user.name,
        email: user.email
    });
}

export const getUserfromDB = async () => {
    try {
        const q = query(collection(db, "users"));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log("Data in getUserfromDB ", data);
        return data
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
}



