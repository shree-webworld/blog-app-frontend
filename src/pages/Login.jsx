import { Box, Container, Input, Button, Image, Center, Text, useToast } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import { NavLink, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, InputLeftElement,
          InputLeftAddon} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import axios from "axios";
import {useAtom, useSetAtom} from "jotai";
import {userAtom} from "../atom";
import {useTitle} from "../utils/generalFunctions.js";




export default function Login({isUserAuthenticated})
{
  useTitle("Blog - Login");
  const base_url = import.meta.env.VITE_BASE_URL;
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();
  let [showPassword, setShowPassword] = useState(false);
  let handlePasswordIcon = () => setShowPassword(!showPassword) ;
  const toast = useToast();
  const navigate = useNavigate();
  let setAccount = useSetAtom(userAtom);
  let [account] = useAtom(userAtom);



  useEffect( ()=>{
                    setFocus("email");
                  },[])


  let onSubmit = async (signinData) =>{
                      try
                      {
                        let {email, password} = signinData;
                        // console.log(email, password);
                        let result = await axios.post(`${base_url}/api/signin`, {email, password});
                        console.log("result",result);

                        sessionStorage.setItem('accessToken', `Bearer ${result.data.accessToken}`);
                        sessionStorage.setItem('refreshToken', `Bearer ${result.data.refreshToken}`);
                        sessionStorage.setItem('username', `${result.data.name}`);

                        setAccount({name: result.data.name, email: result.data.email});

                        isUserAuthenticated(true);
                        reset();
                        navigate("/blog");

                        toast({
                          title: 'Signin successfull',
                          description: "Happy Blogging",
                          status: 'success',
                          duration: 4000,
                          position: "top",
                          isClosable: true,
                        });

                      }catch (e)
                       {
                         console.log(e);
                         toast({
                           title: 'Invalid Credentials',
                           description: "Signin again!!",
                           status: 'error',
                           duration: 4000,
                           position: "top",
                           isClosable: true,
                         });


                       }
                          }

  return(<>

    <Container centerContent bg="#FAFAFA" maxW='md' my="5rem" className="border border-gray-500 rounded-lg" style={{fontFamily: "'Inter', sans-serif"}}>
        <Center>
            <Image src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png"
                  boxSize="8rem" objectFit='contain' alt='blog-logo'/>
        </Center>


        <Box my="2rem" px="5rem">
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="email">
              Email :
            </FormLabel>

            <Input type="email" id="email" name="email" placeholder='Enter email'
                    variant='outline'
                    {...register("email",{
                                            required: true,
                                            pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Email must be valid",
                                                     },
                                         }
                                )
                    }
                    autoComplete="off"  focusBorderColor='blue.500' w="23rem" size="md"/>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="1.5rem" isInvalid={errors.password}>
            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="password">
              Password :
            </FormLabel>

            <InputGroup w="23rem">
             <Input placeholder="Enter password" id="password" variant='outline' focusBorderColor='blue.500'
                     type={showPassword ? 'text' : 'password'}
                     name="password" {...register("password",{
                                                                required: "Password is required...",
                                                             }
                                                  )
                                     }
                     autoComplete="off" size="md"
              />
              <InputRightElement>
                  <Button  size='sm' onClick={handlePasswordIcon} bg="white" color="blue.500">
                     {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                  </Button>
               </InputRightElement>
             </InputGroup>
             <FormErrorMessage>
               {errors.password?.message}
             </FormErrorMessage>
        </FormControl>

        <Button type="submit" bg="#FB641B" color="white" px="10rem" my="2rem"
                fontSize="lg" borderRadius='lg' _hover={{bg:"orange.600"}}
        >
          Login
        </Button>
      </form>


            <Text color="gray.500"  fontSize="1rem" textAlign="center">
              OR
            </Text>

          <Center>
           <NavLink className="text-center text-blue-500 mt-5" to="/signup">
            Create an account
          </NavLink>
        </Center>
      </Box>
    </Container>


        </>);
}
