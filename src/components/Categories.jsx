import {Button} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {Link, useSearchParams} from "react-router-dom";
import { useLocation } from "react-router";
import {useEffect} from "react";
import axios from "axios";


export default function Categories()
{
   const categories = [
      { id: 1, type: "Music" },
      { id: 2, type: "Movies" },
      { id: 3, type: "Sports" },
      { id: 4, type: "Tech" },
      { id: 5, type: "Fashion" }
  ];

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const base_url = import.meta.env.VITE_BASE_URL;


  let fetchCategoryPost = async () =>{
                              try
                              {
                                let res = await axios.get(`${base_url}/api/post?category=${category || ''}`);
                                console.log("fetchCategoryPost ",res);
                              }catch (e)
                                {
                                    console.log(e);
                                }
                             }

  useEffect(()=>{
                    fetchCategoryPost();
                },[category]);


  return(<>

            <TableContainer>
              <Table variant='unstyled' w="17rem">
                <Thead>
                  <Tr>
                    <Th>
                      <Button as={Link} to={`/create?category=${category || ''}`}
                              color='white' bg="blue.500" px="2.5rem" _hover={{bg: "blue.100", color:"blue.600"}}>
                        CREATE BLOG
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Thead>
                  <Tr>
                    <Th>
                      <Button as={Link} to="/blog" colorScheme='teal' variant='link'>
                        All categories
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                {
                  categories.map(category =>(
                                              <Tr key={category.id}>
                                                <Td>
                                                  <Button as={Link} to={`/blog?category=${category.type}`}
                                                          colorScheme='teal' variant='link'>
                                                    {category.type}
                                                  </Button>
                                                </Td>
                                              </Tr>
                                            )
                                )
                }
                </Tbody>
              </Table>
            </TableContainer>
        </>);
}
