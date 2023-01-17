import {Box, Container, Image, Input, Button, Textarea, useToast} from "@chakra-ui/react";
import {useForm} from 'react-hook-form';
import axios from "axios";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, InputLeftElement,
          InputLeftAddon, Tooltip} from '@chakra-ui/react';
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import {useAtomValue} from "jotai";
import {userAtom} from "../atom";
import {useTitle} from "../utils/generalFunctions.js";



export default function CreatePost()
{
  useTitle("Blog - Create Post");

  const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL;
  const base_url = import.meta.env.VITE_BASE_URL;

  const { register, handleSubmit, reset, setFocus, setError, getValues, setValue, formState: {errors}  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [file, setFile] = useState('');
  const account = useAtomValue(userAtom);
  let categories = "";


  let picData = async (image) =>{
                                  try
                                  {
                                    const data = new FormData();
                                    data.append("file",image);
                                    data.append("upload_preset","blogimage");
                                    data.append("cloud_name","shreeproject");
                                    let res = await axios.post(`${cloudinary_url}`,data);
                                    console.log(res);
                                    return res.data.secure_url;

                                  }catch (e)
                                    {
                                      console.log(e);
                                    }
                               }





  const onSubmit = async (postData) =>{

                    try
                    {
                      toast({
                        title: 'Please Wait ',
                        description: "Don't Refresh page or Click Back Button",
                        status: 'info',
                        duration: 3000,
                        position: "top",
                        isClosable: true,
                      });
                      let {pic, title, description } = postData;

                      let picture = await picData(pic[0]);
                      console.log("url - ", picture);

                      categories = location.search?.split('=')[1] || 'All';
                      let username = sessionStorage.getItem("username");
                      let createdDate = new Date();

                    let res2 = await axios.post(`${base_url}/api/createpost`, {picture, title, description, categories, username, createdDate});
                    console.log(res2);

                    if(res2.status === 201)
                    {
                      toast({
                                title: 'Successfull',
                                description: "Blog posted successfully",
                                status: 'success',
                                duration: 3000,
                                position: "top",
                                isClosable: true,
                            });
                      navigate("/blog");
                    }

                    }catch (e)
                      {
                        console.log(e);
                        toast({
                                  title: 'Failed',
                                  description: e.response.data.error,
                                  status: 'error',
                                  duration: 3000,
                                  position: "top",
                                  isClosable: true,
                              });

                      }
            }



  return(<>
              <Container centerContent bg="#FAFAFA" maxW='lg' my="5rem" className="border border-gray-500 rounded-lg" style={{fontFamily: "'Inter', sans-serif"}}>
                <Box my="2rem" px="5rem">
                  <p className="text-2xl font-medium text-gray-900 pt-5">
                    Create Blog Post
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type="text" {...register("title")} autoComplete="off" placeholder='Title'
                            color="gray.900" fontSize="1rem" _placeholder={{color: 'gray.500' }} my="1.5rem"
                            className="capitalize"/>

                          <Textarea placeholder=' Tell your story...' size="md"
                                    {...register("description")} resize="vertical"
                                  _placeholder={{color: 'gray.500' }}/>


                    <Tooltip label="Upload Blog Image" aria-label='A tooltip'
                            hasArrow placement="top" bg="orange.200" color="gray.900">
                    <Input type="file" {...register("pic")} autoComplete="off" variant='flushed'
                            color="gray.900" fontSize="1rem"  mt="2rem"/>
                        </Tooltip>

                    <Button type="submit" bg='#FB641B' px="10rem" my="2rem" _hover={{bg:"orange.600"}}
                            fontSize="lg" borderRadius='full' color="white"
                    >
                      Publish
                    </Button>
                  </form>

                </Box>
              </Container>

        </>);
}
