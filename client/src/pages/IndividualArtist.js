import React,{useEffect,useState} from 'react';
import { Spinner } from 'reactstrap';
import Web3 from 'web3';

function IndividualArtist({match}){

    //gets data from nodejs from mongodb
    const getData=async()=>{
        const data = await fetch('http://localhost:5000/api/artists/'+match.params.id)
        const res = await data.json()
        setArtistData(res[0]);
        console.log(res);
    }

    
    //initializes instance of web3 to access our private blockchain.
    const loadWeb3 =async()=>{
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }

        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }

        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

      //Load the account details and create a new block
    const loadBlockchainData =async()=>{
        const web3 = window.web3;
        // Load account`
        const accounts = await web3.eth.getAccounts();
        setUserData(accounts);
        console.log(userData);
        // this.setState({ account: accounts[0] })
        // Network ID
        // const networkId = 3
        // const networkData1 = UploadFiles.networks[networkId]
        // if(networkData1) {
        // console.log("reached here")
        // const uploadFiles=new web3.eth.Contract(UploadFiles.abi,networkData1.address)
        // this.setState({ uploadFiles })
        // console.log(this.state.uploadFiles)
    }


    useEffect(()=>{
        getData();
        loadWeb3();
        // loadBlockchainData();
    },[])

    const [artistData,setArtistData] = useState(null);
    const [userData,setUserData] = useState("");

    if(artistData!==null){
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
    else {
        return(
            <div>
                <Spinner type="grow" color="primary" size="lg"/>
            </div>
        )
    }    
}

export default IndividualArtist;