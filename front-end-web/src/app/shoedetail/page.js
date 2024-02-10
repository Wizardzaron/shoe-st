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

    // if (typeof Storage !== 'undefined') {
    //     // Web Storage is supported
    //     console.log('Web Storage is supported in this browser.');
    // } else {
    //     // Web Storage is not supported
    //     console.log('Web Storage is not supported in this browser.');
    // }

    const searching = (event) =>{

        event.preventDefault();
        
        console.log(searchValue);
    
    
    }


    const [item, setItem] = useState(null);

    useEffect(() => {

        
        const urlParams = new URLSearchParams(window.location.search);
        var item_id = urlParams.get('id')
        //console.log(item_id);

        const formData = new FormData();
        formData.append("item_id", item_id);

       
        fetch('https://shoe-st-4581e5bc88b0.herokuapp.com/shoedata?item_id=' + item_id,{

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
          .catch(e => console.log(e))
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

                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="5" checked className={styles.hideradio} />
                            W 5/ M 3.5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="5.5" checked className={styles.hideradio}/>
                            W 5.5/ M 4
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="6" checked className={styles.hideradio}/>
                            W 6/ M 4.5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="6.5" checked className={styles.hideradio}/>
                            W 6.5/ M 5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="7" checked className={styles.hideradio}/>
                            W 7/ M 5.5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="7.5" checked className={styles.hideradio}/>
                            W 7.5/ M 6
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="8" checked className={styles.hideradio}/>
                            W 8/ M 6.5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="8.5" checked className={styles.hideradio}/>
                            W 8.5/ M 7
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="9" checked className={styles.hideradio}/>
                            W 9/ M 7.5
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="9.5" checked className={styles.hideradio}/>
                            W 9.5/ M 8
                        </label>
                    </div>
                    <div class="radio">
                        <label className={styles.ghostbutton}>
                            <input type="radio" name="size" value="10" checked className={styles.hideradio}/>
                            W 10/ M 8.5
                        </label>
                    </div>
                    <section className={styles.split}>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="10.5" checked className={styles.hideradio}/>
                                W 10.5/ M 9
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="11" checked className={styles.hideradio}/>
                                W 11/ M 9.5
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="11.5" checked className={styles.hideradio}/>
                                W 11.5/ M 10
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="12" checked className={styles.hideradio}/>
                                W 12/ M 10.5
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="12.5" checked className={styles.hideradio}/>
                                W 12.5/ M 11
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="13" checked className={styles.hideradio}/>
                                W 13/ M 11.5
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="13.5" checked className={styles.hideradio}/>
                                W 13.5/ M 12
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="14" checked className={styles.hideradio}/>
                                W 14/ M 12.5
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="14.5" checked className={styles.hideradio}/>
                                W 14.5/ M 13
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="15" checked className={styles.hideradio}/>
                                W 15/ M 13.5
                            </label>
                        </div>
                        <div class="radio">
                            <label className={styles.ghostbutton}>
                                <input type="radio" name="size" value="15.5" checked className={styles.hideradio}/>
                                W 15.5/ M 14
                            </label>
                        </div>
                    </section>

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