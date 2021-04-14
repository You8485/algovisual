import React, { Component } from 'react'


class BruteForceList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <>
                <h1>
                Bruteforce List
                
                </h1>
                <h2>
                    <li>
                        <a href="/bruteforce/bfs">BFS</a>
                    </li>
                    <li>
                        <a href="/bruteforce/bubblesort">BubbleSort </a>
                    </li>
                    <li>
                        <a href="/bruteforce/insertionsort">Insertion Sort </a>
                    </li>
                    <li>
                        <a href="/bruteforce/selectionsort">Selection Sort </a>
                    </li>
                    
                    
                </h2>
            </>
        )
    }
}

export default BruteForceList
