"use client"
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import Link from "next/link";
import UserName from "../components/UserName"
import LoginPassword from "../components/LoginPassword"
import SignUpButton from "../components/SignUpButton"

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";

export default function LoginButton() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const AddressRef = useRef(null);
  const UsernameRef = useRef(null);

  // we are passing the address of onClose function
  const Login = (event, onClose) => {
    event.preventDefault();

    console.log("I'm in login");

    console.log(AddressRef.current.getPassword());
    console.log(UsernameRef.current.getUsername());

    const password = AddressRef.current.getPassword();
    const username = UsernameRef.current.getUsername();


    try {
      fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/login?passwd=" + password + "&username=" + username, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((loginResponse) => {
          if (loginResponse["loggedin"] == "True") {
            onClose();
            window.location.reload();
          } else {
            alert("Incorrect username or password");
          }
        });
    } catch (error) {
      console.error("Server error at logging in : ", error);
    }
  };
  
  return(
    <>
      <button onClick={onOpen}className={styles.spaceBetweenLink}>
        {" "}
        Login
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={styles.nextuimodal} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <div className={styles.modalnavbar}>
              <SignUpButton />
              <LoginButton />
              <Link href={"/forgotpass"} className={styles.forgotpassword}>
                  Forgot your password?{" "}
              </Link>
              <hr style={{border: "1px solid black", marginTop: "10px"}}/>
            </div>
            <ModalBody className={styles.modalbody}>
              <h1 className={styles.aligntext}>Login</h1>
              <form onSubmit={Login}>
                <UserName ref={UsernameRef}/>
                <LoginPassword ref={AddressRef}/>
              </form>

            </ModalBody>
            <ModalFooter style={{display:"flex",justifyContent: "center" ,alignItems:"center"}}>
              <Button className={styles.modalbuttonclose} variant="light" onPress={onClose}>
                Close
              </Button>
              {/* the ()=> is a lambda function which says not to call onClose right this minute until it is called in the function */}
              <Button className={styles.modalbuttoninput} color="primary" onClick={(e)=>Login(e,onClose)}>
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      </Modal>
    </>
  );
}