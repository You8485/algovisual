import React, { Component } from 'react';

import brute_force_gif from './gifs/bf.gif'
import branch_and_bound_gif from './gifs/bs.gif'
import divide_and_conquer_gif from './gifs/dac.gif'
import dp_gif from './gifs/fibo.webp'
import greedy_gif from './gifs/gre.gif'
//import ham_gif from './gifs/ham.gif'
import nqueen_gif from './gifs/nq.gif'
import recursion_gif from './gifs/rec.webp'
import uncatogarized_gif from './gifs/uc.webp'

import styles from './css/homepage.module.css'


class Square_Comp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    //17 20 21
    render() {
        console.log(this.props.id);
        var tmp_img;
        var tmp_algo_part;
        if(this.props.id==='recursion'){
            tmp_img=recursion_gif;
            tmp_algo_part="Recursion";
        }
        else if(this.props.id==="brute-force"){
            tmp_img=brute_force_gif;
            tmp_algo_part="BruteForce";
        }
        else if(this.props.id==="divide-and-conquer"){
            tmp_img=divide_and_conquer_gif;
            tmp_algo_part="Divide and Conquer";
        }
        else if(this.props.id==="greedy"){
            tmp_img=greedy_gif;
            tmp_algo_part="Greedy";
        }
        else if(this.props.id==="dynamic-programming"){
            tmp_img=dp_gif;
            tmp_algo_part="Dynamic Programming";
        }
        else if(this.props.id==="backtracking"){
            tmp_img=nqueen_gif;
            tmp_algo_part="BackTracking";
        }
        else if(this.props.id==="branch-and-bound"){
            tmp_img=branch_and_bound_gif;
            tmp_algo_part="Branch and Bound";
        }
        else{
            tmp_img=uncatogarized_gif;
            tmp_algo_part="Extra Algorithms";
        }
        return (
            <>
            <li id={this.props.id} className={styles.li}>
                <div className={styles.liWrapper,styles.div} style={{backgroundColor:"white"}}>
                    <a className={styles.thumbnail,styles.a} href={this.props.href} data-anim="sorting">
                        <img className={styles.img_class} src={tmp_img} alt="please wait" width="243.652px" height="182.719px"></img>
                        <div className={styles.static} style={{backgroundImage: ""}}></div>
                        <div className={styles.middle,styles.div}>
                            <div className={styles.message,styles.div}>  </div>
                        </div>
                    </a>
                    <div className={styles.info,styles.div}>
                        <h3 className={styles.h3}>
                            <a className={styles.a} id="" href="">{tmp_algo_part}</a>
                            {/*<a className={styles.links,styles.a} href="" style={{background: "rgb(254, 197, 21)"}}> Training </a>*/}

                        </h3>
                        {/*<div className={styles.indvVizFilters,styles.div}>
                        <span className={styles.filter , styles.span} style={{backgroundColor: "rgb(170, 170, 170)"}}>Element1</span>
                        <span className={styles.filter ,styles.span} style={{backgroundColor: "rgb(170, 170, 170)"}}>Element2</span>
                        </div>*/}
                    </div>
                </div>
            </li>
            </>
        )
    }
}

export default Square_Comp
