import React, { Component } from 'react'

 class RecursionList extends Component {
    render() {
        return (
            <>
           
                <h1>Recursion List</h1>
                <ul>
                    <li>
                    <a href="/recursion/factorial">Factorial</a>
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

export default RecursionList
