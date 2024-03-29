'use client'
import React, {useState, useEffect} from 'react';
import styles from '../page.module.css'
import Link from 'next/link'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha512-kgrXVPaJi1gUqEbb3lVdpJ3tWjfCfEUGD4tKm5GpUW1Gy6PIq3n89kk0zEIWxgBlfpaZD7lcmTFdHL8u5eSzug==" crossorigin="anonymous" referrerpolicy="no-referrer" />


const ShoePage = () => {

    const [searchValue, setSearchValue] = useState(null);

    const setSearch = (event) => {

        setSearchValue(event.target.value)
    }

    const searching = (event) =>{

        event.preventDefault();
        
        console.log(searchValue);
    
    
    }

    const testing = (event) =>{
        event.preventDefault();
        console.log("Hello");
    }

    const displayValue = (event) => {
        
        event.preventDefault();
        var input = document.querySelector('input[name="size"]:checked').value;
        console.log(input);

        // <link
        //     href={{
        //         pathname: '../checkout',
        //         query: input

        //     }}
        // >       
        // </link>

    }


    const [item, setItem] = useState(null);

    useEffect(() => {

        const button = document.querySelector('.ghostbutton');
        
        if(button){
            button.addEventListener('click', testing)
        }
        const urlParams = new URLSearchParams(window.location.search);
        var item_id = urlParams.get('id')
        //console.log(item_id);

        const formData = new FormData();
        formData.append("item_id", item_id);

       
        fetch('https://shoe-st-api-58c2623d13b8.herokuapp.com/shoedata?item_id=' + item_id,{

            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
              },          
        })
        
        .then((response) => response.json()) 
        .then((item) => {
            console.log(item)
            setItem(item)
          })
          .catch(e =>{ 
            console.log("Before error")    
            console.log({e})
            console.log("After error")
        })
    },[])
    if(item == null){
        return console.log("returned null")
    }


return(
<>
    <div>
        {item.map((it, index) => {
            return(
                <div className={styles.shoe} key={index}>
                    <div class={styles.followers}>
                        <div class={styles.spacingInsideSticky}>
                            <img
                                src = "/fakeLogo.png"
                                width={100}
                                hieght={100}                        
                            />
                            <Link href="/signup" className={styles.stickySpaceLink}> Create Account</Link>
                            <Link href="/login" className={styles.stickySpaceLink}> Login</Link>
                            <form style={{display:'inline-block'}} onSubmit={searching}>
                                <input style={{marginLeft:"30px"}} 
                                    id="search" 
                                    type="text" 
                                    class="input" 
                                    placeholder="search..." 
                                    value={searchValue} 
                                    onChange={setSearch}
                                />   
                                <div id="form-action" style={{display:'inline-block'}}>
                                    <button type='submit' style={{marginLeft:"10px"}}>Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.descriptivetext}>
                        <p style={{fontSize: 'x-large'}}>{it.names}</p>
                        <p>{it.gender}</p>
                        <p>{it.category}</p>
                        <p>{it.price}</p>
                    </div>
                    <p>Select Size</p>
                    <form onSubmit={displayValue}>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="5" className={styles.hideradio} />
                                W 5/ M 3.5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="5.5" className={styles.hideradio}/>
                                W 5.5/ M 4
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="6" className={styles.hideradio}/>
                                W 6/ M 4.5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="6.5" className={styles.hideradio}/>
                                W 6.5/ M 5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="7" className={styles.hideradio}/>
                                W 7/ M 5.5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="7.5" className={styles.hideradio}/>
                                W 7.5/ M 6
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="8" className={styles.hideradio}/>
                                W 8/ M 6.5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="8.5" className={styles.hideradio}/>
                                W 8.5/ M 7
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="9" className={styles.hideradio}/>
                                W 9/ M 7.5
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="9.5" className={styles.hideradio}/>
                                W 9.5/ M 8
                            </label>
                        </div>
                        <div className="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="10" className={styles.hideradio}/>
                                W 10/ M 8.5
                            </label>
                        </div>
                        <section className={styles.split}>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="10.5" className={styles.hideradio}/>
                                    W 10.5/ M 9
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="11" className={styles.hideradio}/>
                                    W 11/ M 9.5
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="11.5" className={styles.hideradio}/>
                                    W 11.5/ M 10
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="12" className={styles.hideradio}/>
                                    W 12/ M 10.5
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="12.5" className={styles.hideradio}/>
                                    W 12.5/ M 11
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="13" className={styles.hideradio}/>
                                    W 13/ M 11.5
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="13.5" className={styles.hideradio}/>
                                    W 13.5/ M 12
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="14" className={styles.hideradio}/>
                                    W 14/ M 12.5
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="14.5" className={styles.hideradio}/>
                                    W 14.5/ M 13
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="15" className={styles.hideradio}/>
                                    W 15/ M 13.5
                                </label>
                            </div>
                            <div className="radio">
                                <label className={styles.ghostbutton}>
                                    <input type="radio" name="size" value="15.5" className={styles.hideradio}/>
                                    W 15.5/ M 14
                                </label>
                            </div>
                        </section>

                        <div id="form-action">
                            <button type="submit" class="btn btn-default">Submit</button>
                        </div>
                    </form>
                    <img
                        className={styles.images}
                        src = {it.images}
                        height={650}
                    /> 
                </div>
            )
        })}
    </div>


</>

)
};

export default ShoePage;