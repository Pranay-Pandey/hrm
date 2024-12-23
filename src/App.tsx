import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

//components
import Navbar from "./components/Navbar";
import NewSidebar from './components/NewSidebar';
// pages
import Patients from "./pages/Patients";
import RegistrationForm from "./pages/Register";
import Login from './pages/Login';
import DoctorLogin from "./pages/DoctorLogin";
import DoctorView from "./pages/DoctorView";
import DoctorRegister from "./pages/DoctorRegister";
import Sidebar from "./components/Sidebar";
import DoctorSidebar from "./components/DoctorSidebar";
import PatientHome from './pages/PatientHome';
import PatientHomev2 from "./pages/PatientHomev2";
import PatientAddDiag from "./pages/PatientAddDiag";
import PatientAppointment from "./pages/PatientAppointment";
import Error from './pages/Error';
import HospitalInfo from "./pages/Hospital";
import { Logout } from "./components/Logout";
// import { extendTheme } from "@chakra-ui/react";

import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import {useSessionStorage} from './utils/useSessionStorage'
import PatientProfile from "./pages/PatientProfile";
import Welcome from "./pages/Welcome";
// import { ChakraProvider } from "@chakra-ui/react";
import Chatbot from './components/Chatbot';

import { BsBarChart } from "react-icons/bs";
import { BiMap, BiChalkboard } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {
  SidenavProvider,
  SidenavContainer,
  SidenavItem,
  Sidenav
} from "./components/sidenav";

const App: React.FC = () => {

  const [loggedIn,setLoggedIn] = useState(false);

  const [token,setToken] = useSessionStorage('token','');
  const [user,setUser] = useSessionStorage('user',JSON.stringify({}));
  const [login,setLogin] = useSessionStorage('login',false);

  const navItems: SidenavItem[] = [
    { icon: FaHome, label: 'Home',to:'/patient_home' },
    { icon: FaUser, label: 'Profile', to:'/patient_profile'},
    { icon: FaCog, label: 'Add Diagnosis',to:'/patient_adddiag' },
    { icon: FaUser, label: 'Make Appointment',to:'/patient_appointment' },
    { icon: FaSignOutAlt, label: 'Logout', to: '/logout' }
  ];

  let User={}
  
  if(login==="true")
  { User = JSON.parse(user);}

  useEffect(()=>{
    if(login==="true") setLoggedIn(true);
    else setLoggedIn(false);
  },[login])

  // const colors = {
  //   primary: "black",
  //   secondary: "purple",
  //   tertiary: "green",
  //   warning: "yellow",
  //   danger: "white",
  // };

  // const customTheme = extendTheme({
  //   colors,
  //   styles: {
  //     global: {
  //       body: {
  //         bg: "white",
  //         color: "rgba(0, 0, 0, 0.9)",
  //       },
  //       a: {
  //         color: "teal.500",
  //         _hover: {
  //           textDecoration: "underline",
  //         },
  //       },
  //       button: {
  //         backgroundColor: "pink",
  //         color: "black"
  //       }
  //     },
  //   },
  // });

  return (
    // <ChakraProvider theme={customTheme}>
    <div className="h-100">
      {/* <Navbar />  */}
      {/*<Chatbot />*/}
      {/* {loggedIn && login==="true" && token.length && (User as any).speciality===undefined && 
        <SidenavProvider>
        <SidenavContainer sidenav={<Sidenav navItems={navItems} />}/>
        </SidenavProvider>
        } */}
      
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor_login" element={<DoctorLogin />} />
        <Route path="/doctor_view" element={(login==="true" && token.length)?<DoctorView/> :""} />
        <Route path="/doctor_register" element={<DoctorRegister />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient_home" element={(login==="true" && token.length) ? <PatientHome />:<Error />} />
        <Route path="/patient_profile" element={(login==="true" && token.length) ? <PatientProfile />:<Error />} />
        <Route path="/patient_adddiag" element={(login==="true" && token.length) ? <PatientAddDiag />:<Error />} />
        <Route path="/patient_appointment" element={(login==="true" && token.length) ? <PatientAppointment />:<Error />} />        
        <Route path="/hospital" element={<HospitalInfo/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/patient_homev2" element={(login==="true" && token.length) ? <PatientHomev2 />:<Error />} />
      </Routes>  
    </div>
    // </ChakraProvider>
  );

};

export default App;
