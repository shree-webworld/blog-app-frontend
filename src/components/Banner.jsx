import { Box, Image, Heading, Center, Flex, Text, VStack } from '@chakra-ui/react';

export default function Banner()
{
  return(<>
              <Box bgImage="url('https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')"
                    bgPosition="center"  w="100%"  h="35vh" bgAttachment="scroll"
                    display="flex" alignItems="center" justifyContent="center" className="object-fill"
              >
                  <VStack>
                  <Heading size="3xl" color="white" bg="gray.900" py="2rem" px="3rem" borderRadius="2rem">
                     Blog
                   </Heading>
                   <Text fontSize="sm" color="white" bg="gray.900" py="0.5rem" px="1rem" borderRadius="2rem">
                      Made with <i className="bi bi-heart-fill text-red-600"></i>&nbsp;&nbsp;by SHREEDHAR
                    </Text>
                  </VStack>

              </Box>

        </>);
}
