import React, { Component } from 'react';
import Web3 from "web3";
import {Button, FormGroup, Label, Form, Spinner } from 'reactstrap';
import "./Auth.css"


class Authenticate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: props.match.params.user,
            token: props.match.params.token,
            account: '',
            verifying: false,
            transactionID:null,
        };
    }

    auth = async () =>{
        let result = await fetch(`http://localhost:5000/login/user/?user=${this.state.user}`);
        let token = await result.json();

        if(token === this.state.token){
            console.log(token);
            console.log(this.state.token);
            alert("logged in");
            this.setState({verifying:true});
            let rawTrans = await fetch(`http://localhost:5000/login/verify/?user=${this.state.user}&account=${this.state.account}`);
            let rawJson = await rawTrans.json();
            this.setState({transactionID:rawJson, verifying:false});

            console.log(rawJson);
            alert("verified!")
            
        } else{
            alert("Invalid User Or already verified!");
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
        console.log(accounts);
    } 

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    render(){
        return(
            <div className="verify">
                <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        {/* <Label for="auth" className="mr-sm-2">Verify</Label> */}
                        {/* <Input type="text" name="auth" id="auth" onChange={this.} placeholder="Your metamask address" /> */}
                        <Button size="lg" color = "success" onClick={this.auth}>Verify your MetaMask Address</Button>
                    </FormGroup>
                </Form> 
                {this.state.verifying? <Spinner style={{width: '3rem', height: '3rem',marginRight:"15px"}}type="grow" color="primary" />:null}
                {this.state.transactionID? <div onClick={()=>window.open(`https://ropsten.etherscan.io/tx/${this.state.transactionID}`,"_blank")}>{this.state.transactionID}</div> : null}
            </div>
        )
    }    
}

export default Authenticate;