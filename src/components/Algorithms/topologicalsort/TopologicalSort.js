import React, { Component } from 'react'
import styled from "styled-components";
import styl from '../modal/modal.module.css';
import DirectedGraph from '../directedGraph/DirectedGraph'
import style2 from '../../css/component.module.css';


class TopologicalSort extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            prv_x: null,
            prv_y: null,
            counter: 0,
        }

        this.draw_node=this.draw_node.bind(this);
        this.draw_edge=this.draw_edge.bind(this);
        this.add_node=this.add_node.bind(this);
        this.add_edge=this.add_edge.bind(this);
        this.topologicalSort=this.topologicalSort.bind(this);

        this.canvasRef=React.createRef();

        var graph;
    }

    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        window.graph=new DirectedGraph(ctx);

        /*Draw Node */
        this.draw_id=document.getElementById("draw");
        this.draw_id.addEventListener('click',this.draw_node)
    
        /* Draw Edge */
        this.edge_id=document.getElementById("edge");
        this.edge_id.addEventListener('click',this.draw_edge);

        /*TopoLogical Sort */
        this.topo_id=document.getElementById("topo");
        this.topo_id.addEventListener('click',this.topologicalSort);
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
            window.graph.add_edge(prv_x,prv_y,x,y,0);
            
        }
        this.setState(
            {
                prv_x: x,
                prv_y: y,
            },
        ) 
        
        
    }
    topologicalSort(){
        //console.log("call")
        window.graph.topologicalSort();
    }
    
    render() {
        return (
            <>
                <div className={style2.canvasPlaceholder}>
                    <canvas className={style2.canvas}ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} id="outercanvas"></canvas>
                </div>
                <div id={style2.controls}>
                    <button id="draw" className={style2.buttonClass}>Draw</button>
                    <button id="edge" className={style2.buttonClass}>Edge</button>
                    <button id="topo" className={style2.buttonClass}>Topological Sort</button>
                    <button id="reset" className={style2.buttonClass}>Reset</button>
                    <button  className={style2.buttonClass}><a href="../" style={{textDecoration: 'none'}}>Home</a></button>
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

export default TopologicalSort
