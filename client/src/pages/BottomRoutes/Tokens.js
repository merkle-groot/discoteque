import React, { Component } from 'react';
import "./AboutArtist.css"
import ercContract from "../../abi/PeachPit.json";
import {Form, FormGroup, Button } from 'reactstrap';
import doge from "../../images/doge.png";
import Web3 from "web3";;


class Tokens extends Component{

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            username: ' ',
            coins:0,
        }
    }    

    async loadWeb3 (){
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider.enable())
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData (){
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] })
        console.log(accounts)

        // Network ID
        const networkId = 3;

        // Set Contract
        if(networkId) {
            const erc = new web3.eth.Contract(ercContract,"0x82cAa2CE04B4df6fBE29FD87df0Ba6Bd34f327EB");
            this.setState({ erc })
            console.log(erc);
        }
    } 
   
    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }


    usernameSubmit = async(e) =>{
        e.preventDefault();
        const getCoins = await this.state.erc.methods.getPoints().send(
            {
                from:this.state.account,
                value: Web3.utils.toHex(Web3.utils.toWei('0.02', 'ether')), 
            }
        )
        console.log(getCoins);
    }

    render(){
        return(
            <div className="container-ind">
                <div>
                    <h3 className="heading">Get your tokens!</h3>
                </div>
                <div>
                    <img className="artist-image" src={doge} style={{width:250,height:250}} alt="dp"/>
                </div>
                <div className="get-token">
                     <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            {/* <Label for="approveCount" className="mr-sm-2">Approve Coins</Label> */}
                            <Button color = "warning" onClick={this.usernameSubmit}>Get Tokens!</Button>
                        </FormGroup>
                    </Form> 
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
}

export default Tokens;