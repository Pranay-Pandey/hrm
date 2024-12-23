import React, { useState, useEffect } from 'react'
import { useSessionStorage } from './../utils/useSessionStorage'
import UserDiagnosis from './../components/UserDiagnosis'
import {
  Box, FormControl, FormLabel, Icon, Input, Button, SimpleGrid, Flex, Stack, Heading
  , useColorModeValue, Select
} from '@chakra-ui/react'
import axios from 'axios'
import DiagnosisCard from '../components/DiagnosisCard'
import Card from "../components/Card";
import { controlVisibility } from '../utils/operation'
import {
    SidenavProvider,
    SidenavContainer,
    SidenavItem,
    Sidenav
  } from "../components/sidenav";
import Navbar from '../components/Navbar'
  
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function PatientHomev2(){

  const [searchFilter, setSearchFilter] = useState('doctorName'); // Default filter
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const [history, setHistory] = useState([]);
  const [user, setUser] = useSessionStorage('user', JSON.stringify({}));
  const [access, setAccess] = useState([]);
  const [hashedAadhar, setHashedAadhar] = useState('');

  const thisuser = JSON.parse(user);

  const [key, setKey] = useState({
    aadhar: thisuser.aadhar,
  })

  
  const navItems: SidenavItem[] = [
    { icon: FaHome, label: 'Home',to:'/patient_home' },
    { icon: FaUser, label: 'Profile', to:'/patient_profile'},
    { icon: FaCog, label: 'Add Diagnosis',to:'/patient_adddiag' },
    { icon: FaUser, label: 'Make Appointment',to:'/patient_appointment' },
    { icon: FaSignOutAlt, label: 'Logout', to: '/logout' }
  ];

  useEffect(() => {
    console.log(key);
  }, [key])


  const handleSubmit = async () => {
    try {
      const config = {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.post(`${BASE_URL}/api/get_diagnosis`, key, config);

      const { message, data, doctorAccess, hashedAadhar } = response.data;
      console.log("doctorAccess: ", doctorAccess)
      setAccess(doctorAccess);
      setHashedAadhar(hashedAadhar);
      // console.log(data)
      setData(data);

      const newDiagnosisElements = data.map((item: any) => (
        <DiagnosisCard
          key={item._id}
          symptoms={item.data.symptoms}
          doctorName={item.data.doctorName}
          diagnosis={item.data.diagnosis}
          document={item.data.document}
          patientName={item.data.patientName}
          docType={item.data.docType}
          upload={false}
        />
      ));
      setHistory(newDiagnosisElements);

    } catch (error) {
      console.log(error);

    }
  }

  async function remove(item: any){
    let removeAccess = await controlVisibility(item, hashedAadhar);
  }

  return (
    <>
    
    <Flex 
        className='flex--outer'
        w={'100vw'}
        minH={'100vh'}>
        <SidenavProvider>
            <SidenavContainer sidenav={<Sidenav navItems={navItems} />}/>
        </SidenavProvider>
        <Flex 
        direction={'column'}
        w='inherit'
        >
            <Navbar />
        <Flex
        className='flex--inner'
        align={'center'}
        justify={'center'}
        bg='aliceblue'
        h="100%"
        margin="0px 8px 8px 0px"
        borderRadius="20px"
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                All Diagnosis
                </Heading>
                <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                onClick={(e) => {
                    handleSubmit();
                }}>
                Show Diagnosis
                </Button>

                { history.length>0 && <>
                
                <FormControl id="search">
                        <FormLabel>Search by:</FormLabel>
                        <Select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
                        <option value="doctorName">Doctor Name</option>
                        <option value="docType">Document Type</option>
                        <option value="diagnosis">Diagnosis</option>
                        <option value="symptoms">Symptoms</option>
                        </Select>
                        <FormLabel>Search Query:</FormLabel>
                        <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <Button
                        size="md"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={(e) => {
                            const newDiagnosisElements = data
                                .filter(item => {
                                const searchQueryLower = searchQuery.toLowerCase(); 
                                switch (searchFilter) {
                                    case 'doctorName':
                                    return item.data.doctorName.toLowerCase().includes(searchQueryLower);
                                    case 'docType':
                                    return item.data.docType.toLowerCase().includes(searchQueryLower);
                                    case 'diagnosis':
                                    return item.data.diagnosis.toLowerCase().includes(searchQueryLower);
                                    case 'symptoms':
                                    return item.data.symptoms.toLowerCase().includes(searchQueryLower);
                                    default:
                                    return true; // Default to including all items
                                }
                                })
                                .map(item => (
                                <DiagnosisCard
                                    key={item._id}
                                    symptoms={item.data.symptoms}
                                    doctorName={item.data.doctorName}
                                    diagnosis={item.data.diagnosis}
                                    document={item.data.document}
                                    patientName={item.data.patientName}
                                    docType={item.data.docType}
                                    upload={false}
                                />
                                ));
                            setHistory(newDiagnosisElements);
                        }}>
                        Search Diagnosis
                        </Button>
                    </FormControl>

                </>}
                {history}
                {/* { access.length>0 && <Heading fontSize={'4xl'} textAlign={'center'}>Doctors who have access<Heading/> } */}
                { access.length>0 && <Heading fontSize={'2xl'} textAlign={'center'}>
                All Doctors with Access to your Diagnosis
                </Heading>}
                <Stack spacing={4} style={{ flex: 1, flexDirection: "row" }}>
                
                {access.map(item => {
                
                return <Card title={item.name} sex={item.sex} age={item.age} 
                speciality={item.speciality} controlVisiblity={()=>remove(item.aadhar)}/>;
                })}
            </Stack>

            </Stack>
            </Stack>
        </Flex>
        </Flex>
    </Flex>
    </>
  )
}

// export default PatientHomev2;