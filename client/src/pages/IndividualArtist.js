import React,{useEffect,useState} from 'react';
import { Spinner } from 'reactstrap';
import "./IndividualArtist.css"
import Web3 from 'web3';

function IndividualArtist({match}){

    //gets data from nodejs from mongodb
    const getData=async()=>{
        const data = await fetch('http://localhost:5000/api/artists/'+match.params.id)
        const res = await data.json()
        setArtistData(res[0]);
        console.log(res);
    }

    useEffect(()=>{
        getData();
    },[])

    const [artistData,setArtistData] = useState(null);
    // const [userData,setUserData] = useState("");

    if(artistData!==null){
        return(
            <div className="container-ind">
                <div>
                    <h2>{artistData.name}</h2>
                </div>
                <div>
                    <img src={artistData.img} style={{width:250,height:250}} alt="dp"/>
                </div>
                <div>
                    <div className="container-dec">
                        <p>{artistData.desc}</p>
                    </div>
                </div>
                {/* <div className="artist-dasboard">
                <h2>{artistData.name}</h2>
                    <div className="artist-image">
                        <img src={artistData.img} style={{width:250,height:250}} alt="dp"/>
                    </div>
                    <div className="artist-overview">
                        <h2>{artistData.name}</h2>
                        <p>{artistData.desc}</p>
                    </div>
                </div> */}
            </div>
        )
    }
    else {
        return(
            <div style={{ margin: 0,
                position: "absolute",
                top: "50%",
                left: "45%"}}>
                <Spinner style={{width: '3rem', height: '3rem',marginRight:"15px"}}type="grow" color="primary" />
                <Spinner style={{width: '3rem', height: '3rem',marginRight:"15px"}}type="grow" color="secondary" />
                <Spinner style={{width: '3rem', height: '3rem'}}type="grow" color="success" />
            </div>
        )
    }    
}

export default IndividualArtist;