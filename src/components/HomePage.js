import React, { Component } from 'react';
import style from'./css/homepage.module.css';

import SQUARE_COMP from './Square_Comp'


export class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount() {
        var tmp=document.getElementsByTagName('body');
        tmp.className+=style.body;
    }
    
    render() {
        

        return (
            <>
                <div id={style.topBar} className={style.div}>
                <a id={style.home} href="" className={style.a}>
                    <span className={style.color,style.span} style={{color: "rgb(254,197,21)"}} > Algorithm Vizualizer</span>
                </a>
                </div>
                <div id={style.darkOverlay} className={style.div}></div>
                <div id={style.main} className={style.div}>
                    <ul  className={style.ul,style.list}>
                        <SQUARE_COMP id="recursion" href="/recursion"></SQUARE_COMP>
                        <SQUARE_COMP id="brute-force" href="/bruteforce"></SQUARE_COMP>
                        <SQUARE_COMP id="divide-and-conquer" href="/divideandconquer"></SQUARE_COMP>
                        <SQUARE_COMP id="greedy" href="/greedy"></SQUARE_COMP>
                        <SQUARE_COMP id="dynamic-programming" href="/dynamicprogramming"></SQUARE_COMP>
                        <SQUARE_COMP id="backtracking" href="/backtracking"></SQUARE_COMP>
                        <SQUARE_COMP id="branch-and-bound" href="/branchandbound"></SQUARE_COMP>
                        
                    </ul>
                </div>
                
            </>
        )
    }
}

export default HomePage
