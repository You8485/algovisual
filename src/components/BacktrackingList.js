import React, { Component } from 'react'

class BacktrackingList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <>
                
                <h1>
                    Backtracking    
                </h1>  

                <ul>
                <li>
                <a href="/backtracking/nqueens">NQueens</a>
                </li>

                <li>
                <a href="/backtracking/sudoku">Sudoku</a>
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

export default BacktrackingList
