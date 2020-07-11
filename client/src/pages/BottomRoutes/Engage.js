import React, { useState, useEffect, Component} from 'react';
import "./AboutArtist.css";
import voterContract from "../../abi/Voter.json";
import ercContract from "../../abi/PeachPit.json";
import { Progress, Button, FormGroup, Input, Label, Form } from 'reactstrap';
import Web3 from "web3";

class Engage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            choice:[],
            approve:0,
            usable:0,
            votes1:0,
            votes2:0,
            votes3:0,
            votes4:0
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
        const networkId = 5;

        // Set Contract
        if(networkId) {
            console.log("reached here")
            const voting = new web3.eth.Contract(voterContract,"0x6Ad476E449BA9C5212ae852bA91Ee593F0A90888");
            this.setState({ voting })
            console.log(voting);

            const erc = new web3.eth.Contract(ercContract,"0xa11dAcA6c020c3b71ce4CE22823F2397341D3784");
            this.setState({ erc })
            console.log(erc);
        }
    } 
    
    async getData(){
        // const choice = this.state.voting.methods.options(0).call();
        // const value = await choice;
        let options = [];
        for (var i = 0; i < 4; i++) {
            const optionTemp = await this.state.voting.methods.options(i).call();
            options[i] = optionTemp;
        }

        this.setState({
            choice:options
        })

        let coins = await this.state.erc.methods.allowance(this.state.account,"0xa11dAcA6c020c3b71ce4CE22823F2397341D3784").call();
        this.setState({ usable:coins });
        console.log(this.state.choice);
    }

    approveCoins = async(e) => {
        e.preventDefault();
        console.log(this.state.approve);
        const app = await this.state.erc.methods.approve("0x70F9E0902611D1cdF076556bC440a9d436e84185",parseInt(this.state.approve)).send(
            {
                from:this.state.account
            }
        );
        console.log(app)

    }

    approveCount = (e) => {
        this.setState({approve: e.target.value});
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.getData();

        setInterval(() => {
            this.getData();
        }, 2000);
    
    }

    withdraw = async(e) => {
        e.preventDefault();
        const withdrawResult = await this.state.voting.methods.withdrawCoins().send(
            {
                from:this.state.account
            }
        )
    }

    setVoteCount1 = (e) => {
        this.setState({votes1: e.target.value});
    }

    setVoteCount2 = (e) => {
        this.setState({votes2: e.target.value});
    }

    setVoteCount3 = (e) => {
        this.setState({votes3: e.target.value});
    }

    setVoteCount4 = (e) => {
        this.setState({votes4: e.target.value});
    }


    vote1 = async(e) => {
        e.preventDefault();
        console.log(this.state.votes1);
        const vote1Result = await this.state.voting.methods.vote1(this.state.votes1, Math.pow(this.state.votes1,2) ).send(
            {
                from:this.state.account
            }
        )
    }

    vote2 = async(e) => {
        e.preventDefault();
        console.log(this.state.votes2);
        const vote2Result = await this.state.voting.methods.vote2(this.state.votes2, Math.pow(this.state.votes2,2) ).send(
            {
                from:this.state.account
            }
        )
    }

    vote3 = async(e) => {
        e.preventDefault();
        console.log(this.state.votes3);
        const vote3Result = await this.state.voting.methods.vote3(this.state.votes3, Math.pow(this.state.votes3,2) ).send(
            {
                from:this.state.account
            }
        )
    }

    vote4 = async(e) => {
        e.preventDefault();
        console.log(this.state.votes4);
        const vote4Result = await this.state.voting.methods.vote4(this.state.votes4, Math.pow(this.state.votes4,2) ).send(
            {
                from:this.state.account
            }
        )
    }


   
    render(){
        return(
            <div className="container-ind engage">
                <div>
                    <h3 className="heading">Join polls and AMAs!</h3>
                </div>

                <div className = "approve">
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            {/* <Label for="approveCount" className="mr-sm-2">Approve Coins</Label> */}
                            <Input onChange={this.approveCount} type="number" name="approveCount" id="approveCount" placeholder="Approve Coins" />
                            <Button color = "warning" onClick={this.approveCoins}>Submit</Button>
                        </FormGroup>
                    </Form> 
                </div>

                {/* <div className="approve-count">{this.state.usable} coins</div> */}

                <div className="poll-question">
                   Where should we hold our next concert? :)
                </div>
                <Button outline className="withdraw-button" onClick={this.withdraw} color="primary" size="lg">Withdraw Your Tokens</Button>
                <div className = "bars">

                    <div className="poll-ind">
                        <div className="poll-content">
                            <div className="poll-text" >Calgary</div>
                            <Progress animated value={this.state.choice[0]} />
                            <div className="poll-count">{this.state.choice[0]} votes</div>
                        </div>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input onChange={this.setVoteCount1} type="number" name="noOfVotes" id="noOfVotes" placeholder="No of votes" />
                                <div>= {Math.pow(this.state.votes1,2)} tokens </div>
                            </FormGroup>
                        </Form> 
                        <div className="poll-button"><Button onClick={this.vote1} color="success">Vote</Button></div> 
                    </div> 
                    
                    <div className="poll-ind">
                        <div className="poll-content">
                            <div className="poll-text">Vancouver</div>
                            <Progress animated color="success" value={this.state.choice[1]} />
                            <div className="poll-count">{this.state.choice[1]} votes</div>
                        </div>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input onChange={this.setVoteCount2} type="number" name="noOfVotes" id="noOfVotes" placeholder="No of votes" />
                                <div>= {Math.pow(this.state.votes2,2)} tokens </div>
                            </FormGroup>
                        </Form> 
                        <div className="poll-button"><Button onClick={this.vote2} color="success">Vote</Button></div> 
                    </div>

                    <div className="poll-ind">
                        <div className="poll-content">
                            <div className="poll-text">New York</div>
                            <Progress animated color="info" value={this.state.choice[2]} />
                            <div className="poll-count">{this.state.choice[2]} votes</div>
                        </div>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input onChange={this.setVoteCount3} type="number" name="noOfVotes" id="noOfVotes" placeholder="No of votes" />
                                <div>= {Math.pow(this.state.votes3,2)} tokens </div>
                            </FormGroup>
                        </Form> 
                        <div className="poll-button"><Button onClick={this.vote} color="success">Vote</Button></div> 
                    </div>  

                    <div className="poll-ind"> 
                        <div className="poll-content">
                            <div className="poll-text">California</div>
                            <Progress animated color="warning" value={this.state.choice[3]}  />    
                            <div className="poll-count">{this.state.choice[3]} votes</div>
                        </div> 
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Input onChange={this.setVoteCount4} type="number" name="noOfVotes" id="noOfVotes" placeholder="No of votes" />
                                <div>= {Math.pow(this.state.votes4,2)} tokens </div>
                            </FormGroup>
                        </Form> 
                        <div className="poll-button"><Button onClick={this.vote4} color="success">Vote</Button></div> 

                    </div>
                </div>

               
            </div>
        )
    }    
}

export default Engage;