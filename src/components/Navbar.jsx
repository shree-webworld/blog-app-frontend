import { Box, Flex,Text, Center } from '@chakra-ui/react';
import {NavLink, useNavigate} from "react-router-dom";

export default function Navbar()
{
  const navigate = useNavigate();
  let handleLogOut = () =>{
                              sessionStorage.clear();
                              navigate("/");
                          }

  return(<>
              <Box py="1rem" boxShadow='xl'>
               <Center>
                <NavLink to="/blog">
                  <Text color="gray.900">HOME</Text>
                </NavLink>
                <NavLink>
                  <Text color="gray.900" mx="1.5rem">ABOUT</Text>
                </NavLink>
                <NavLink>
                  <Text color="gray.900">CONTACT</Text>
                </NavLink>

                  <Text color="gray.900" _hover={{cursor:"pointer"}} mx="1.5rem" onClick={handleLogOut}>
                    LOGOUT
                  </Text>

              </Center>
             </Box>
        </>);
}
