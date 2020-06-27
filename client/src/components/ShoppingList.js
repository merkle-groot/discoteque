import React, {useState} from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
const uuidv4 = require('uuid/v4');

function ShoppingList(){
    
    const items=[
        {
            id:uuidv4(),
            name:"Eggs"
        },
        {
            id:uuidv4(),
            name:"Milk"
        },
        {
            id:uuidv4(),
            name:"Steak"
        },
        {
            id:uuidv4(),
            name:"Water"
        },
    ]
    const [itemList,setItemList] = useState(items);
    console.log(typeof(itemList))

    return(
        <Container>
            <Button
                color="dark"
                style={{marginBottom:"2rem"}}
                onClick={()=>{
                    const name = prompt("Enter Item");
                    if(name) {
                        setItemList([...itemList,{name,id:uuidv4()}])
                        console.log(itemList)
                    }
                }}
            >Add Item
            </Button>
            <Button 
                onClick={()=>window.location.assign("http://www.last.fm/api/auth/?api_key=d83142322b6ff9b66fb411b8cde07431")}
            >Login</Button>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {itemList.map(({id,name})=>(
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={()=>
                                        setItemList(currList=>
                                            currList.filter(item => item.id !==id)
                                        )
                                    } 
                                >&times;</Button>
                                {name}</ListGroupItem>
                        </CSSTransition>    
                    ))}
                </TransitionGroup>    
            </ListGroup> 

        </Container>
    )
}


export default ShoppingList;
