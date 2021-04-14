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
            <h2>
                    <li>
                        <a href="/divideandconquer/mergesort">MergeSort</a>
                    </li>
                    <li>
                        <a href="/divideandconquer/countingsort">Counting Sort</a>
                    </li>

                    <li>
                        <a href="/divideandconquer/bucketsort">Bucket Sort</a>
                    </li>

                </h2>
            </>
        )
    }
}

export default DivideandConquerList
