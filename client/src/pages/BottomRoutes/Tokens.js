import React, { Component } from 'react';
import "./AboutArtist.css"
// import getWeb3 from "../../getWeb3/getWeb3";
import {Form, FormGroup,Input, Button } from 'reactstrap';
import doge from "../../images/doge.png"


class Tokens extends Component{

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            username: ' ',
            coins:0,
        }
    }    
   
    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();
    //     setIsPressed(true);
    //     const data = await fetch('http://localhost:5000/api/points')
    //     const res = await data.json()
    //     console.log(res)
    //     setPoints(res);
    //     setIsPressed(false);
    // }


    // const getTokens = async() => {
    //     const web3 = await getWeb3();

    //     // Use web3 to get the user's accounts.
    //     const accounts = await web3.eth.getAccounts();
    //     setIsPressed(true);
    //     const data = await fetch('http://localhost:5000/api/points')
    //     const res = await data.json()
    //     console.log(res)
    //     setPoints(res);
    //     setIsPressed(false);
    // 

    usernameChange = (e) =>{
        this.setState({username: e.target.value});

        // const data = await fetch('http://localhost:5000/api/points?user')
        //     const res = await data.json()
    }

    usernameSubmit = async(e) =>{
        e.preventDefault();
        const data = await fetch(`http://localhost:5000/api/points?user=${this.state.username}`)
        const res = await data.json()
        this.setState({coins:res})
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
                            <Input onChange={this.usernameChange} type="text" name="approveCount" id="approveCount" placeholder="Last.fm Username" />
                            <Button color = "warning" onClick={this.usernameSubmit}>Submit</Button>
                            
                        </FormGroup>
                        {this.state.coins} coins
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