'use client'
import React, {useState, useEffect} from 'react';
import styles from '../page.module.css'
import Link from 'next/link'
//import { useRouter } from 'next/router'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug==" crossorigin="anonymous" referrerpolicy="no-referrer" />

const Checkout = () => {



    const router = useRouter();
    const data = router.query;
    console.log(data);



}

export default Checkout;