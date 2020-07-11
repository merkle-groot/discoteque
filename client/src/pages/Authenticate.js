import React, { Component } from 'react';
import Web3 from "web3";
import {Button, FormGroup, Label, Form } from 'reactstrap';


class Authenticate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: props.match.params.user,
            token: props.match.params.token,
            account: '',
        };
    }

    auth = async () =>{
        let result = await fetch(`http://localhost:5000/login/user/?user=${this.state.user}`);
        let token = await result.json();

        // if(token === this.state.token){
            console.log(token);
            console.log(this.state.token);
            alert("logged in");
            let rawTrans = await fetch(`http://localhost:5000/login/verify/?user=${this.state.user}&account=${this.state.account}`);
            let rawJson = await rawTrans.json();
            console.log(rawJson);
            const transaction = await Web3.eth.sendSignedTransaction(rawJson);
            console.log(transaction);
        // } else{
        //     alert("Invalid User")
        // }
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
            <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="auth" className="mr-sm-2">Approve Coins</Label>
                    {/* <Input type="text" name="auth" id="auth" onChange={this.} placeholder="Your metamask address" /> */}
                    <Button color = "success" onClick={this.auth}>Submit</Button>
                </FormGroup>
            </Form> 
        )
    }    
}

export default Authenticate;