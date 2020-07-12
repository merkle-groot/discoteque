import React, { Component } from 'react';
import ercContract from "../../abi/PeachPit.json";
import {Table} from 'reactstrap';
import Web3 from "web3";
import "./AboutArtist.css"

class LeaderBoard extends Component{


    constructor(props) {
        super(props)
        this.state = {
            account: '',
            balances: [],
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
            console.log("reached here");
            const erc = new web3.eth.Contract(ercContract,"0x82cAa2CE04B4df6fBE29FD87df0Ba6Bd34f327EB");
            this.setState({ erc })
            console.log(erc);
        }
    } 

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.getData();
    
    }

    async getData(){
        const noOfAccounts = await this.state.erc.methods.sizeOfLUT().call();
        console.log(noOfAccounts);

        let tempBalances = []

        for(let i = 0; i < noOfAccounts; i++) {
            const accountAddress = await this.state.erc.methods.addressLUT(i).call();
            const accountBalance = await this.state.erc.methods.balanceOf(accountAddress).call();
// console.log(accountAddress,accountBalance);
            tempBalances.push({id:i,account:accountAddress,balanceCoin:accountBalance});
            // console.log(this.state.balances);
        }
        this.setState({balances:tempBalances});
        console.log(this.state.balances);
        // const choice = this.state.voting.methods.options(0).call();
        // const value = await choice;
        // let options = [];
        // for (var i = 0; i < 4; i++) {
        //     const optionTemp = await this.state.voting.methods.options(i).call();
        //     options[i] = optionTemp;
        // }

        // this.setState({
        //     choice:options
        // })

        // let coins = await this.state.erc.methods.allowance(this.state.account,"0x9AE35dF5f0faBA83a7Be23BF7aE83b74FD3C6296").call();
        // this.setState({ usable:coins });
        // console.log(this.state.choice);
    }

    render(){
        return(
            <div className="container-ind">
                <div>
                    <h3 className="heading">Leaderboard</h3>
                </div>
                <div>
                    <div className="container-dec">
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                        
                                {this.state.balances.map(item =>(
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.account}</td>
                                        <td>{item.balanceCoin}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>    
                        </Table>
                    </div>
                </div>
            </div>
        )    
    }    
}

export default LeaderBoard;