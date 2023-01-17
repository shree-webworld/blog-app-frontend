import { Text, SimpleGrid, Heading, Button, Box, Stack, Center, Image, Grid } from '@chakra-ui/react';
import axios from "axios";
import {useEffect, useState} from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Posts({posts})
{
  const base_url = import.meta.env.VITE_BASE_URL;



  return(<>
            {
              posts?.length > 0 ? posts.map((post)=>(
                                                        <Card maxW='sm' key={`${post._id}`} my="1rem" >
                                                          <Link to={`/post/${post._id}`}>
                                                          <CardBody className="shadow-xl shadow-gray-500">
                                                            <Image
                                                              src={`${post.picture}`}
                                                              alt={`${post.title}`}
                                                              borderRadius='lg'
                                                              w="20rem" h="15rem"
                                                              objectFit="cover"
                                                            />
                                                            <Stack mt='6' spacing='3'>
                                                              <Heading size='md' className="truncate" textTransform="capitalize">
                                                                {`${post.title}`}
                                                              </Heading>
                                                              <Text color='blue.600' fontSize='md'>
                                                                Category - {`${post.categories}`}
                                                              </Text>
                                                              <Text color='blue.600' fontSize='sm'>
                                                                { new Date(post.createdDate).toDateString()}
                                                              </Text>
                                                            </Stack>
                                                          </CardBody>
                                                        </Link>
                                                        </Card>

                                                    )
                                            ):

                  (<>
                    <Box>
                     <Text fontSize="md" fontWeight="semibold">
                      No data is available for selected category
                    </Text>
                  </Box>
                </>)

            }

        </>);
}
