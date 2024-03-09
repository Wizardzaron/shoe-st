'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link';
import styles from '../page.module.css'

const LoginPage = () =>{

    const router = useRouter()

    const Login = (event) =>{
        event.preventDefault()

        //retrieves the values I put in the the text boxs after pressing the submit button
        var formData = new FormData(event.target);

        console.log(formData);

        try{
            fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/login',{
                method: 'POST',
                body: formData,
                credentials: 'include'
            })

            .then(response =>{ 
                
                    const status = response.status
                
                    if(status === 401){
                        console.log("Incorrect login");
                        router.push('/login');
                    }
                    else if(status === 200){
                        console.log("Success login");
                        router.push('/user');
                    }
                    else{
                        router.push('/login');
                    }
    
                }
            )

        }
        catch(error){
            console.error("Error occured at posting data: ",error);
        }
    }
    return(
        <div>
            <section className={styles.loginpage}>
                <h1 class={styles.aligntext}>Login</h1>
                <form onSubmit={Login}>
                    <div id="username" className="mb-3">
                        <label htmlFor="username" class={styles.attributetext}>UserName</label>
                        <input
                        type="text"
                        placeholder="Please Enter your UserName"
                        name="username"
                        class={styles.textbox}
                        />
                    </div>
                    <div id="passwd" className="mb-3">
                        <label htmlFor="password" class={styles.attributetext}>Password</label>
                        <input
                        type="password"
                        placeholder="Please Enter your password"
                        name="passwd"
                        class={styles.textbox}
                        />
                    </div>
                    <div id="form-action">
                        <button type='submit' className={styles.button}>Submit</button>
                    </div>
                    <Link href="/home" className={styles.custombutton2}>Go Back</Link>

                </form>
            </section>
        </div>
    );
};
export default LoginPage;