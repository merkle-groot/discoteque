import React,{useEffect,useState} from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import {Link} from 'react-router-dom';
  

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
    
    
    const [artistData,setArtistData] = useState([]);

    return(
        <div>
            {artistData.map(artist => (
            <Card style={{width:300,height:300,textAlign:"center"}}>
                <CardImg  style={{width:150,height:150,textAlign:"center"}} src={artist.img} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{artist.name}</CardTitle>
                    <CardSubtitle>{artist.lastfmId}</CardSubtitle>
                    {/* <CardText>{artist.desc}</CardText> */}

                    <Button to="/login" >
                        <Link to={`/artist/${artist._id}`}>
                        Enter Page
                        </Link>
                    </Button>
                </CardBody>
            </Card>))}
    </div>
    )
}

export default Dashboard;