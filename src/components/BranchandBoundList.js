import React, { Component } from 'react';

class BranchandBoundList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    
    
    render() {
        return (
            <>
            
                <h1>
                    Branch And Bound
                </h1>

                <ul>
                    <li>
                        <a href="/branchandbound/bst">Binary Search Tree</a>
                    </li>
                    <li>
                        <a href="/branchandbound/topologicalsort">Topological Sort</a>
                    </li>

                    <li>
                        <a href="/branchandbound/binarysearch">Binary Search</a>
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

export default BranchandBoundList
