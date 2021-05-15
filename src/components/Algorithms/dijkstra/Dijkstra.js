import React, { Component } from 'react'
import styled from "styled-components";
//import styl from '../modal/modal.module.css';
import DirectedGraph from '../directedGraph/DirectedGraph'
import style2 from '../../css/component.module.css';


class Dijkstra extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            prv_x: null,
            prv_y: null,
            counter: 0,
            shortest_path: null,
        }

        this.draw_node=this.draw_node.bind(this);
        this.draw_edge=this.draw_edge.bind(this);
        this.add_node=this.add_node.bind(this);
        this.add_edge=this.add_edge.bind(this);
        this.dijkstra_algo=this.dijkstra_algo.bind(this);        
        

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

        /* */
        this.dijkstra_id=document.getElementById("dijkstra");
        this.dijkstra_id.addEventListener('click',this.dijkstra_algo);

        /*Reset */
        this.reset_id=document.getElementById("reset");
        this.reset_id.addEventListener('click',()=>{
            window.location.reload();
        });

    }

    dijkstra_algo(){
        //console.log("Algorithms");
        var shortest=window.graph.dijkstra_algo();
        this.setState(
            {
                shortest_path: shortest,
            },

        );
        //console.log(this.state.shortest_path)
        //console.log(shortest)
    }

    draw_node(){
        var tmp_id=document.getElementById("draw");
        var canvas=document.getElementById("outercanvas");
        if(tmp_id.innerHTML=="Draw"){
            canvas.addEventListener('click',this.add_node);
            tmp_id.innerHTML="Done";
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
        var x=e.pageX;
        var y=e.pageY;
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
            window.graph.add_edge(prv_x,prv_y,x,y,1);
            
        }
        this.setState(
            {
                prv_x: x,
                prv_y: y,
            },
        ) 
        
        
    }
    
    render() {
        //console.log(this.state.shortest_path);
        var sh_ans;

        var btn_css={
            backgroundColor: `transparent`,
            color: `white`,
            width: `${25}%`,
            alignItems: `center`,
            borderColor: `rgb(255, 255, 255)`,
        };
        try{
            sh_ans=this.state.shortest_path.map((val,index)=>
            (
            <>
                <div>
                    <li style={
                    {

                        listStyleType:`none`,
                        marginRight:`100px`,
                        marginLeft:`100px`,
                        fontWeight: `bold`,
                        fontSize: `large`,
                    }} >
                        {0} to {index} {`->`}{val}
                    </li>
                </div>
            </>
            ));

            /*sh_ans=this.state.shortest_path.map( sh_ans=>{
                return 
                }
            );*/
        }
        catch(e){
            console.log("Done");
        }

        return (
            <>
                <div className={style2.canvasPlaceholder}>
                    <canvas className={style2.canvas} ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} id="outercanvas"></canvas>
                </div>
                <div id={style2.controls}>
                    <div>
                        <button id="draw" className={style2.buttonClass}>Draw</button>
                        <button id="edge" className={style2.buttonClass}>Edge</button>
                        <button id="dijkstra" className={style2.buttonClass}> Find shortest path </button>
                        <button id="reset" className={style2.buttonClass}>Reset</button>
                        <button className={style2.buttonClass} ><a href="../" style={{textDecoration: 'none'}}>Home</a></button>
                    </div>
                    <p style={{display: `inline`,fontWeight: `bold`,
                        fontSize: `large`,}}>
                        <br></br>
                        <br></br>
                        Src node to all other node 
                        {/* <li style={{listStyleType:`none`}}> */}
                            {sh_ans}
                        {/* </li> */}
                    </p>
                    
                    
                                    
                </div>

            </>
        )
    }
}

export default Dijkstra
// {<div id="myModal" className={styl.modal}>
//                         <span className={styl.close} id="close">&times;</span>
//                         {/*<button id="node-submit" className={styl.bt_class}>Submit</button>*/}
            
//                         <div className={styl.modal_content}  id="box" ref={this.element} >
                            
//                         </div>
//                     </div>    }