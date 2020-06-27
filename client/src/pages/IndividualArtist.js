import React,{useEffect,useState} from 'react';

function IndividualArtist({match}){
    const getData=async()=>{
        const data = await fetch('http://localhost:5000/api/artists/'+match.params.id)
        const res = await data.json()
        setArtistData(res[0]);
        console.log(res);
    }

    useEffect(()=>{
        getData();
    },[])

    const [artistData,setArtistData] = useState([]);

    return(
        <div>
            <h1>{artistData.name}</h1>

            <div>
                <img src={artistData.img} style={{width:250,height:250}} alt="pic of artist" />
                <p>
                    {artistData.desc}
                </p>
            </div>
        </div>
    )
}

export default IndividualArtist;