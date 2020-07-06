import React from 'react';
import "./AboutArtist.css"
// import getWeb3 from "../../getWeb3/getWeb3";
// import { Spinner } from 'reactstrap';
import doge from "../../images/doge.png"

function Tokens(){
    // const [isPressed,setIsPressed] = useState(false);
    // const [points,setPoints] = useState(0);

    // const getTokens = async() => {
    //     const web3 = await getWeb3();

    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();
    //     setIsPressed(true);
    //     const data = await fetch('http://localhost:5000/api/points')
    //     const res = await data.json()
    //     console.log(res)
    //     setPoints(res);
    //     setIsPressed(false);
    // }

    // const initWeb3 = async() =>{
    //     const web3 = await getWeb3();

    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();
       
    //     // console.log(accounts)
    // }

    // useEffect(()=>{
    //     initWeb3();
    // })



    return(
        <div className="container-ind">
            <div>
                <h3 className="heading">Get your tokens!</h3>
            </div>
            <div>
                <img className="artist-image" src={doge} style={{width:250,height:250}} alt="dp"/>
            </div>
            <div>
                {/* <div className="container-dec">
                    <button onClick={()=>getTokens()} disabled={isPressed}>Get your weekly coins</button>
                    {isPressed?(
                        <div style={{textAlign:"center"}}>
                            <div>We are crunching the numbers</div>
                            <Spinner color="primary"/>
                        </div>
                    ):null}
                </div> */}
            </div>
            <div>
                {/* {points?(
                    <div>{points}</div>
                ):null} */}
            </div>
        </div>
    )
}

export default Tokens;