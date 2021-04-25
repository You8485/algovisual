import React, { Component } from 'react'
//https://youtu.be/PGwXZqviGyg
class DivideandConquerList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <>
            
            <h1>
                Divide And Conquer List      
            </h1>  
            <ul>
                    <li>
                        <a href="/divideandconquer/mergesort">MergeSort</a>
                    </li>
                    <li>
                        <a href="/divideandconquer/countingsort">Counting Sort</a>
                    </li>

                    <li>
                        <a href="/divideandconquer/bucketsort">Bucket Sort</a>
                    </li>
                    <li>
                        <a href="/divideandconquer/quicksort">Quick Sort</a>
                    </li>
                    <li>
                        <a href="/divideandconquer/randomizedquicksort">R Quick Sort</a>
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

export default DivideandConquerList
