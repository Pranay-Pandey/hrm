import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    RadioGroup,
    Radio,
    createStandaloneToast
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { showToast } from '../utils/showToasts';
import {useSessionStorage} from './../utils/useSessionStorage'
import {useNavigate} from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const { toast, ToastContainer } = createStandaloneToast();

export default function SignupCard() {
    const [form, setForm] = useState({
        aadhar: '',
        password:''
    })

    const [login,setSessionLogin] = useSessionStorage('login','false');
    const [token,setSessionToken] = useSessionStorage('token','');
    const [user,setSessionUser] = useSessionStorage('user',JSON.stringify({}))

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const allFieldsFilled = () => {
        const values = Object.values(form);
        return values.every(value => value.trim().length > 0);
    }

    const handleSubmit = async () =>{
        const url = `${BASE_URL}/api/login`
        let config = {
            maxBodyLength: Infinity, 
            headers: {
                'Content-Type': 'application/json'
            }
        };

    axios.post(url, form, config)
      .then((response) => {
        console.log(response.data)
        const {message, name, age, sex, aadhar, token} = response.data;
        setSessionLogin("true");
        setSessionToken(token);
        setSessionUser(JSON.stringify({name,age,sex,aadhar}))
        navigate('/patient_homev2')
        window.location.reload();

      })
      .catch((error) => {
        console.log(error.message)
      });
    }
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Login
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to start off quickly! ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                    
                                    <FormControl id="aadhar" isRequired>
                                        <FormLabel>Aadhar Card Number</FormLabel>
                                        <Input type="text" onChange={(e) => {
                                            setForm(prev => ({ ...prev, aadhar: e.target.value }))
                                        }} />
                                    </FormControl>
             
                            <FormControl id="password" isRequired>
                                <FormLabel>Enter your password</FormLabel>
                                <Input type="text" onChange={(e) => {
                                    setForm(prev => ({ ...prev, password: e.target.value }))
                                }} />
                            </FormControl>
                        

                            <Stack spacing={10} pt={2}>
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
                                    Login
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Not registered? <Link color={'blue.400'} href="/register">Register</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <ToastContainer />
        </>
    )
}