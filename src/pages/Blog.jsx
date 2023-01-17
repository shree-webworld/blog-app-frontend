import {useTitle} from "../utils/generalFunctions.js";
import { Container, SimpleGrid, Grid, GridItem, HStack, Box } from '@chakra-ui/react';
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Posts from "../components/Posts";
import { useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import { ViewPort, Right, Left } from "react-spaces";


export default function Blog()
{
  useTitle("Blog");

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const base_url = import.meta.env.VITE_BASE_URL;


  const fetchPosts = async () => {
                      try
                      {

                        const res = await axios.get(`${base_url}/api/post/${search}`);
                        console.log("Blog - ",res);
                        setPosts(res.data);
                      }catch (e)
                        {
                            console.log("BLOG -",e);
                        }
  };


  useEffect(() => {
                    fetchPosts();
                  }, [search]);

  return(<>

            <Container maxW="100%" className="bg-blue-50">
              <Banner className="mb-10"/>
              <ViewPort top={50} className="mt-72 z-0">
                <Left  size="25%">
                  <Categories />
                </Left>
                <Right scrollable={true}  size="75%">
                  <div className="grid md:grid-cols-3 sm:grid-cols-1 md:gap-x-10 ">
                     <Posts posts={posts}/>
                  </div>
                </Right>
              </ViewPort>
            </Container>
        </>)
}
