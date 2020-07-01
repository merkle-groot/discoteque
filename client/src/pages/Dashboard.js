import React,{useEffect,useState} from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button, Spinner
  } from 'reactstrap';
  import {Link} from 'react-router-dom';
import "./Dashboard.css";
  

function Dashboard(){
    const getData=async()=>{
        const data = await fetch('http://localhost:5000/api/artists')
        const res = await data.json()
        setArtistData(res);
        console.log(res);
    }
    
    useEffect(()=>{
        getData();
    },[])
    
    
    const [artistData,setArtistData] = useState(null);

    if(artistData !== null){
        return(
        
            <div className="dashboard">
                {artistData.map(artist => (
                    <Link to={`/artist/${artist._id}`}>
                        <div className="card">
                            <img alt="dp" src={artist.img} className="artistImage"/>
                            <div className="artistName">{artist.name}</div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    } 
    else{
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

export default Dashboard;