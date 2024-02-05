"use client"

import { Container,Flex,Button } from '@radix-ui/themes';
import { TextField } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';
import './login.css'; 
import img from "../login.png"
import GoogleIcon from "../search.png"
import Link from 'next/link';


const Login: React.FC = () =>{
    
  return (
    <>
    <Container className="container">
      <Flex className="box" justify="center" align="center">
       
        {/* Left side - Display Image */}
        <div className="left">
        <Image src={img} alt="Login Image" width={500} height={300} />
        </div>

        <div className="right">
          <form>
            <label htmlFor="username">Email</label>
            <TextField.Input id="email" type="email" placeholder="Enter your email" />

            <label htmlFor="password">Password</label>
            <TextField.Input id="password" type="password" placeholder="Enter your password" />

            <Button type="submit">Login</Button>
             <Button type="button" className="google-button">
               Continue with <Image src={GoogleIcon} width={20} height={20}></Image>
              </Button>
              <p className="signup">
                Don't have an account? <Link href="/register">
                  SignUp
                </Link>
              </p>
          </form>

        </div>
      </Flex>

          </Container>
    </>
  );
};

export default Login;
