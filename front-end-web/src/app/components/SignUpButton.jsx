"use client";
import React, { useState,useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import Link from "next/link";
import LoginButton from "../components/LoginButton";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

export default function SignUpButton() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [username, setUsername] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [showTextBox, setShowTextBox] = useState(false);


  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const hideTextBox = () => {
    setShowTextBox((prevState) => !prevState);
  };

  const handleZip = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    const decimalCount = numericValue.split(".").length - 1;
    if (decimalCount !== 1) {
      setZipcode(numericValue);
    } else {
      // Alert the user about invalid input
      toast.error("Invalid Input", "Please enter a valid numeric value.");
    }
  };


  const signup = (event) => {

    try {
      fetch(process.env.NEXT_PUBLIC_LOCAL_HOST_URL + "/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Assuming the response is JSON
        })

        .then((data) => {
          console.log("Data: " + data);
        })
        .catch(e => {
          console.log("Before error")
          console.log({ e })
          console.log("After error")
        });
    } catch (error) {
      console.error("Error occured at posting data: ", error);
    }
    router.push('/home');


  }

  return (
    <>
      <button onClick={onOpen} className={styles.spaceBetweenLink}>
        {" "}
        Create Account
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={styles.nextuimodal}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className={styles.modalnavbar}>
                <SignUpButton />
                <LoginButton />
                <hr style={{border: "1px solid black", marginTop: "10px"}}/>
              </div>
              <ModalBody className={styles.modalbody}>
                <h1 className={styles.aligntext}>Create Account</h1>
                <form onSubmit={signup}>
                  <div id="firstName" className="mb-3">
                    <label htmlFor="firstname" className={styles.attributetext}>
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please Enter your First Name"
                      name="firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                      className={styles.textbox}
                    />
                  </div>
                  <div id="lastName" className="mb-3">
                    <label htmlFor="lastname" className={styles.attributetext}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please Enter your Last Name"
                      name="lastname"
                      onChange={(e) => setLastname(e.target.value)}
                      className={styles.textbox}
                    />
                  </div>
                  <div id="username" className="mb-3">
                    <label htmlFor="username" className={styles.attributetext}>
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Please Enter your Username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                      className={styles.textbox}
                    />
                  </div>
                  <div id="pass" className="mb-3">
                    <label htmlFor="passwd" className={styles.attributetext}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Please Enter your password"
                      name="passwd"
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.textbox}
                    />
                  </div>
                  <div id="emailaddr" className="mb-3">
                    <label htmlFor="email" className={styles.attributetext}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Please Enter your Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.textbox}
                    />
                  </div>
                  {/* put street and zip under the button */}
                  <div className={styles.flexbutton}>
                    <button
                      type="button"
                      onClick={hideTextBox}
                      className={styles.shippinginfobutton}
                    >
                      Enter shipping info
                    </button>
                  </div>
                  {showTextBox ? (
                    <>
                      <div id="state" className="mb-3">
                        <label htmlFor="state" className={styles.attributetext}>
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="Please Enter your state"
                          name="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className={styles.textbox}
                        />
                      </div>
                      <div id="city" className="mb-3">
                        <label htmlFor="city" className={styles.attributetext}>
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="Please Enter your city"
                          name="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className={styles.textbox}
                        />
                      </div>
                      <div id="streetaddr" className="mb-3">
                        <label
                          htmlFor="streetaddress"
                          className={styles.attributetext}
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          placeholder="Please Enter your street address"
                          name="streetaddress"
                          onChange={(e) => setStreetaddress(e.target.value)}
                          className={styles.textbox}
                        />
                      </div>
                      <div id="zip" className="mb-3">
                        <label htmlFor="zipcode" className={styles.attributetext}>
                          Zip Code
                        </label>
                        <input
                          type="text"
                          placeholder="Please Enter your zip code"
                          name="zipcode"
                          value={zipcode}
                          onChange={handleZip}
                          className={styles.textbox}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </form>
              </ModalBody>
              <ModalFooter  style={{display:"flex",justifyContent: "center" ,alignItems:"center"}}>
                <Button
                  className={styles.modalbuttonclose}
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className={styles.modalbuttoninput}
                  color="primary"
                  onClick={signup}
                >
                  Submit Info
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
