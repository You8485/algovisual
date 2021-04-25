import React, { Component } from 'react';
import style2 from '../../css/component.module.css';
import Modal from '../modal/Modal'
import styled from "styled-components";
import styl from '../modal/modal.module.css';
import Graph from './Graph';


class BFS extends Component {

    
    constructor(props) {
        super(props)
        
        this.state = {
            prv_x: null,
            prv_y: null,
            counter: 0,
        }

        this.draw_node=this.draw_node.bind(this);
        this.draw_edge=this.draw_edge.bind(this);
        this.add_node=this.add_node.bind(this);
        this.add_edge=this.add_edge.bind(this);

        this.canvasRef=React.createRef();

        var graph;
        
    }

    componentDidMount() {   
        //console.log(document.getElementsByTagName("BODY"));
        document.body.style.backgroundColor="white";
        document.body.style.margin=0;
        document.body.style.padding=0;

        const ctx = this.canvasRef.current.getContext('2d');
        window.graph=new Graph(ctx);

        /*Draw Node */
        this.draw_id=document.getElementById("draw");
        this.draw_id.addEventListener('click',this.draw_node)
    
        /* Draw Edge */
        this.edge_id=document.getElementById("edge");
        this.edge_id.addEventListener('click',this.draw_edge);

        /*BFS*/
        this.bfs_id=document.getElementById("bfs");
        this.bfs_id.addEventListener('click',this.bfs);

        /*DFS*/
        this.dfs_id=document.getElementById("dfs");
        this.dfs_id.addEventListener('click',this.dfs);

        /*Reset */
        this.reset_id=document.getElementById("reset");
        this.reset_id.addEventListener('click',()=>{
            window.location.reload();
        });

        /*Enter Node */
        this.en_id=document.getElementById("bnode");
        this.en_id.addEventListener('click',this.enter_node);

        this.en_idd=document.getElementById("dnode");
        this.en_idd.addEventListener('click',this.enter_node_dfs);
    }

    enter_node_dfs(){
        var person = prompt("Please enter vertex", 0);
        if (person != null) {
            window.graph.node_dfs(person);
        }
    }
    enter_node(){
        var person = prompt("Please enter vertex", 0);
        if (person != null) {
            window.graph.node_bfs(person);
        }
        
    }

    draw_node(){
        var tmp_id=document.getElementById("draw");
        var canvas=document.getElementById("outercanvas");
        if(tmp_id.innerHTML=="Draw"){
            canvas.addEventListener('click',this.add_node);
            tmp_id.innerHTML="Done"
        }
        else{
            canvas.removeEventListener('click',this.add_node);
            tmp_id.innerHTML="Draw";
        }
    }

    draw_edge(){
        var tmp_id=document.getElementById("edge");
        var canvas=document.getElementById("outercanvas");
        if(tmp_id.innerHTML=="Edge"){
            //console.log(canvas)
            canvas.addEventListener('click',this.add_edge);
            tmp_id.innerHTML="Done";
        }
        else{
            canvas.removeEventListener('click',this.add_edge);
            tmp_id.innerHTML="Edge";
        }
    }


    add_node(e){
        var x=e.clientX;
        var y=e.clientY;
        window.graph.add_node(x,y);
    }

    add_edge(e){
        var x=e.clientX;
        var y=e.clientY;

        this.setState(
            {
                counter: (this.state.counter+1)%2,
            },
        )

        if(this.state.counter===1){
            this.setState(
                {
                    prv_x: x,
                    prv_y: y,
                },
            ) 
            return;
        }
        else{
            var prv_x=this.state.prv_x;
            var prv_y=this.state.prv_y;
            window.graph.add_edge(prv_x,prv_y,x,y);
            
        }
        this.setState(
            {
                prv_x: x,
                prv_y: y,
            },
        ) 
        
        
    }

    bfs(){
        window.graph.bfs();
    }

    dfs(){
        window.graph.dfs();
    }

    render() {
        return (
            <>
                <div className={style2.canvasPlaceholder}>
                    <canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} id="outercanvas" className={style2.canvas}></canvas>
                </div>
                <div id={style2.controls}>
                    <button id="draw" className={style2.buttonClass}>Draw</button>
                    <button id="edge" className={style2.buttonClass}>Edge</button>
                    <button id="bfs" className={style2.buttonClass}>BFS</button>
                    <button id="dfs" className={style2.buttonClass}>DFS</button>
                    <button id="bnode" className={style2.buttonClass}>Enter Node BFS</button>
                    <button id="dnode" className={style2.buttonClass}>Enter Node DFS</button>
                    <br></br>
                    <br></br>
                    
                        <button  className={style2.buttonClass}><a href="../" style={{textDecoration: 'none'}}>Home</a></button>

                    <button id="reset" className={style2.buttonClass}>Reset</button>
                    <div id="myModal" className={styl.modal}>
                        <span className={styl.close} id="close">&times;</span>
                        {/*<button id="node-submit" className={styl.bt_class}>Submit</button>*/}

                        <div className={styl.modal_content}  id="box" ref={this.element} >
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default BFS
