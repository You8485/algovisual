import React, { Component } from 'react';
import styl from './modal.module.css';
import styled from "styled-components";

class Modal extends Component {

    constructor(props) {
        super(props)
    
        this.element = React.createRef();
        this.state = {
             circles: [],
             text_circle: [],
        }
    }

    componentDidMount() {
        this.element.current.addEventListener('click', this);

        this.close_id=document.getElementById("close");
        this.close_id.addEventListener('click',()=>{ 
            
            
        this.props.data.trigger(this.state.circles,this.state.text_circle);
        //console.log("After Update")
        var modal=document.getElementById("myModal");
        //console.log(modal)
        modal.style.display="";
        });
    }

    

    componentWillUnmount() {
        
    }

    handleEvent(e){
        var dim = e.target.getBoundingClientRect();

        var x=e.pageX-dim.left;
        var y=e.pageY-dim.top;
        
        let newCircle = (
            <circle
              key={this.state.circles.length + 1}
              cx={x}
              cy={y}
              r="20"
              stroke="black"
              strokeWidth="1"
              fill="black"
              
              text="1"
            >
                
            </circle> 
            
          );

          let newText=(
            <text 
            key={this.state.circles.length+1}
            x={x} y={y} 
            text-anchor="middle"
            stroke="red"
            stroke-width="1px"
            alignment-baseline="middle"
            > {this.state.circles.length}
            </text>
          );
        
          let allCircles = [...this.state.circles, newCircle];
          let alltext=[...this.state.text_circle,newText];

          this.setState(
            {
                circles: allCircles,
                text_circle: alltext,
            },
            //console.log(this.state.circles)
        )

    }
    
    draw(e){
        
        
        
    

    }

    render() {
        
        return (
            <>
                <div id="myModal" className={styl.modal}>
                <span className={styl.close} id="close">&times;</span>
                {/*<button id="node-submit" className={styl.bt_class}>Submit</button>*/}

                    <div className={styl.modal_content}  id="box" ref={this.element} >
                        <svg height="800" width="1200">
                    
                            {this.state.circles}
                            {this.state.text_circle}
                        
                        </svg>
                    </div>
                    

                </div>
                
            </>
        )
    }
}

export default Modal
