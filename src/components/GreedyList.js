import React, { Component } from 'react'



class GreedyList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render() {
        return (
            <>
           
                <h1>Greedy</h1>
                <ul>
                    <li>
                        <a href="/greedy/dijkstra">Dijkstra's Shortest Path</a> 
                    </li>

                    <br></br>
                    <br></br>
                    <a href="../">
                        <button  style={{width:`${10}%`,borderRadius:`10px`,fontSize:`large`}}>Home</button>
                         </a>  
                </ul>
                
            </>
        )
    }
}

export default GreedyList
