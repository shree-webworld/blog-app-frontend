import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Image, Container, VStack, Text, Heading, HStack, Center,
        SimpleGrid, useToast, Input, Textarea, Button } from '@chakra-ui/react';
import {Link, useNavigate} from "react-router-dom";



export default function SinglePost()
{
  const base_url = import.meta.env.VITE_BASE_URL;
  let [singlePost, setSinglePost] = useState();
  let {postId} = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let username =  sessionStorage.getItem('username');



  let fetchSinglePost = async () =>{
                              try
                              {
                                let res = await axios.get(`${base_url}/api/post/${postId}`);
                                console.log("fetchSinglePost ",res);
                                setSinglePost(res.data);
                                setTitle(res.data.title);
                                setDescription(res.data.desc);

                              }catch (e)
                                {
                                    console.log(e);
                                }
                             }


    let handleUpdate = async () =>{
                      try
                      {
                        let res = await axios.put(`${base_url}/api/post/${postId}`,{title, description, username});
                        console.log(res);
                        setUpdateMode(false);


                        toast({
                          title: 'Saved successfully',
                          description: "Post edited and saved successfully!!",
                          status: 'success',
                          duration: 4000,
                          position: "top",
                          isClosable: true,
                        });

                        window.location.reload();

                      }catch (e)
                        {
                            console.log(e);
                            toast({
                              title: 'Cannot update post',
                              description: "You can update only your post!!!",
                              status: 'error',
                              duration: 4000,
                              position: "top",
                              isClosable: true,
                            });

                        }
                  }




  let handleDelete = async () =>{
                            try
                            {
                              console.log(singlePost.username);
                                let res = await axios.delete(`${base_url}/api/post/${postId}`,
                                          {data: {username}, });
                                console.log("handleDelete", res.data);
                                navigate("/blog");
                                toast({
                                  title: 'Deleted',
                                  description: "Post deleted successfully!!",
                                  status: 'success',
                                  duration: 4000,
                                  position: "top",
                                  isClosable: true,
                                });

                            }catch (e)
                            {
                                console.log(e);
                                toast({
                                  title: 'Cannot delete post',
                                  description: "You can delete only your post!!!",
                                  status: 'error',
                                  duration: 4000,
                                  position: "top",
                                  isClosable: true,
                                });

                            }
                        }



  useEffect(()=>{
                    fetchSinglePost();
                },[]);


  return(<>
    {
      singlePost &&
      (<>

    <article className="px-4 py-24 mx-auto max-w-7xl" >
      <div className="w-full mx-auto mb-10 text-left md:w-3/4 lg:w-1/2">
        <div className="pb-6 mb-6 border-b border-gray-200">
          {
            updateMode ?
            (
              <Input type="text" value={title} size="md" variant='outline'
                      autoFocus onChange={(e) => setTitle(e.target.value)} />
            ):
          (
              <h1 className="mb-3 text-3xl font-bold text-gray-900 md:leading-tight md:text-4xl capitalize"
                  itemProp="headline" title={singlePost.title}>
                {singlePost.title}
              </h1>
          )
        }

          <p className="mb-3">
            <i className="bi bi-pencil-square text-green-500 cursor-pointer hover:text-green-300"
                          onClick={() => setUpdateMode(true)}>
            </i>
            <i className="bi bi-trash3 text-red-500 mx-3 cursor-pointer hover:text-red-300" onClick={handleDelete}></i>
          </p>

          <p className="text-base text-gray-500">
            — Written by &nbsp;
            <Link to={`/blog?user=${singlePost.username}`} className="font-normal text-orange-500 text-lg">
              {singlePost.username}
            </Link>
          </p>

          <p className="text-base text-gray-500">
            Category : &nbsp;&nbsp;
            <Link to={`/blog?category=${singlePost.categories}`} className="font-normal text-orange-500 text-lg">
              {singlePost.categories}
            </Link>
          </p>

        </div>
        <div className="flex items-center mb-6 space-x-2">
          <p className="text-base text-gray-500 ">
            <i className="bi bi-square-fill text-orange-500 font-bold text-sm"></i> Published on {new Date(singlePost.createdDate).toDateString()}
          </p>
        </div>
        <Image src={singlePost.picture} alt={singlePost.title} w="100%" h="25rem" objectFit="contain"
                borderRadius="lg" className="bg-center" />

      </div>

      {
        updateMode ?
        (
          <Textarea value={singlePost.description} size="md" resize="vertical"
                    className="md:w-3/4 lg:w-1/2 w-full mx-auto"
                    onChange={(e) => setDescription(e.target.value)}/>
        ):
        (
        <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2 indent-8 text-justify text-lg capitalize">
          <p>
            {singlePost.description}
          </p>
        </div>
        )
    }

    {
        updateMode && (
                        <Center>
                        <Button bg="#FB641B" color="white" px="8rem" mt="3rem"
                                fontSize="lg" borderRadius='lg' _hover={{bg:"orange.600"}}
                                onClick={handleUpdate}
                        >
                          Update
                        </Button>
                        </Center>
                      )
    }
    </article>

      </>)
    }


        </>)
}
