import { Box, Container, Input, Button, Image, Center, Text, useToast } from '@chakra-ui/react';
import {useForm} from 'react-hook-form';
import { NavLink, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, InputLeftElement,
          InputLeftAddon} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import axios from "axios";
import {useTitle} from "../utils/generalFunctions.js";



export default function Signup()
{
  useTitle("Blog - Signup");
  const base_url = import.meta.env.VITE_BASE_URL;
  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm({mode: "all"});
  let [showPassword, setShowPassword] = useState(false);
  let handlePasswordIcon = () => setShowPassword(!showPassword) ;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect( ()=>{
                    setFocus("name");
                  },[])


  let onSubmit = async (signupData) =>{
                            try
                            {
                              let {name, email, password} = signupData;
                              let result = await axios.post(`${base_url}/api/signup`, {name, email, password});
                              console.log("result",result);
                              reset();
                              navigate("/");

                              toast({
                                title: 'Signup successfully',
                                description: "Please Login now",
                                status: 'success',
                                duration: 4000,
                                position: "top",
                                isClosable: true,
                              });

                            }catch (e)
                              {
                                  console.log(e);
                                  toast({
                                    title: 'Signup unsuccessfull',
                                    description: e.response.data.error,
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


        <Box mb="2rem" px="5rem">
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl isRequired  mt="0.5rem" isInvalid={errors.name}>
            <FormLabel fontSize="sm" ml="0.5rem"  htmlFor="name">
              Name :
            </FormLabel>
            <Input type="text" id="name" placeholder="Enter name" variant='outline'
                   focusBorderColor='blue.500' w="23.5rem" size="md"
                   name="name" autoComplete="off" textTransform="capitalize"
                   {...register("name",{
                                                required: "Name is required...",
                                                minLength: {
                                                              value: 3,
                                                              message: "Name must be atleast 3 characters long..."
                                                            },
                                                maxLength: {
                                                              value: 30,
                                                              message: "Name must be atmost 30 characters long...",
                                                          },
                                                pattern: {
                                                            value: /^[a-zA-Z][a-zA-Z ]*$/,
                                                            message: "Only alphabets and spaces, no special characters or numbers are allowed.",
                                                         }
                                              }
                                )
                   }
            />
            <FormErrorMessage ml="0.5rem">{errors.name?.message}</FormErrorMessage>
          </FormControl>


          <FormControl isRequired my="1.5rem" isInvalid={errors.email}>
            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="email">
              Email :
            </FormLabel>

            <Input type="email" id="email" name="email" placeholder='Enter email'
                    variant='outline'
                    {...register("email",{
                                            required: "Email is required...",
                                            pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Email must be valid",
                                                     },
                                         }
                                )
                    }
                    autoComplete="off"  focusBorderColor='blue.500' w="23.5rem" size="md"/>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired mt="1rem" isInvalid={errors.password}>
            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="password">
              Password :
            </FormLabel>

            <InputGroup w="23.5rem">
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
            Signup
          </Button>
        </form>
            <Text color="gray.500"  fontSize="1rem" textAlign="center">
              OR
            </Text>

            <Center>
             <NavLink to="/" className="text-blue-500 mt-5">
               Already have an account
            </NavLink>
          </Center>
      </Box>
    </Container>


        </>);
}
