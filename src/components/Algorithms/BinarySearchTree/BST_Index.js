import React, { Component } from 'react';
//import './circle.css';
import Tree from './Tree';
import style2 from '../../css/component.module.css';

export class BST_Index extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
        
        }
        this.canvasRef=React.createRef("canvas");
        this.CANVASWIDTH=window.innerWidth;
        this.CANVASHEIGHT=window.innerHeight;

        this.TREEX = this.CANVASWIDTH/2;
        this.TREEY = 100;
        this.animationInterval=null;
        var tree;

    }
    
    componentDidMount() {
        const ctx = this.canvasRef.current.getContext('2d');
        window.tree = new Tree(this.TREEX,this.TREEY,ctx);
        console.log(window.tree)
        this.add_id=document.getElementById("add-btn");
        this.add_id.addEventListener('click', this.add);

        this.search_id=document.getElementById("search-btn");
        this.search_id.addEventListener('click', this.search);

        this.quick_fill=document.getElementById("quick-fill-btn");
        this.quick_fill.addEventListener('click', this.quickFill);

        this.reset_btn=document.getElementById("reset-btn");
        this.reset_btn.addEventListener('click', this.reset);

        this.Inorder_btn=document.getElementById("Inorder-btn");
        this.Inorder_btn.addEventListener('click', this.inorder);

        this.Postorder_btn=document.getElementById("Postorder-btn");
        this.Postorder_btn.addEventListener('click', this.postorder);

        this.Preorder_btn=document.getElementById("Preorder-btn");
        this.Preorder_btn.addEventListener('click', this.preorder);

        

    }
    
    reset(){
        //alert('Reset')
        window.location.reload();
    }

    inorder(){
        window.tree.inorder();
    }

    postorder(){
        window.tree.postorder();
    }

    preorder(){
        window.tree.preorder();
    }
    updateCanvas() {

        //console.log(this.refs)
        //console.log(this.canvasRef)
        

    }

    
    quickFill(){
       
        var value = prompt("Enter Total number of node: ");

        if(value === null) {
            value= null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Please enter a positive integer');
            value= null;
        } else {
            value= parseInt(value);
        }
        
        var arr = [];
        while(arr.length < value){
            var r = Math.floor(Math.random() * 100) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        //console.log(arr);
        window.tree.Qfill(arr);
        
    }
    

    add(){
        var value = prompt("Enter node value: ");

        if(value === null) {
            value= null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Please enter a positive integer');
            value= null;
        } else {
            value= parseInt(value);
        }
        console.log("value")
        //console.log(window.tree)   
        //window.tree.add_value(value);
        window.tree.add_value(value);
        
    }

    search(){
        var value = prompt("Enter node value: ");

        if(value === null) {
            value= null;
        } else if(isNaN(parseInt(value)) || value === "" || parseInt(value) < 0) {
            alert('Please enter a positive integer');
            value= null;
        } else {
            value= parseInt(value);
        }
        //console.log(value)

        var fs=window.tree.search(value);
        window.tree.draw();
        console.log(fs)
        
    }

    

    render() {
        return (
            <>
                <div className={style2.canvasPlaceholder}>
                    <canvas  ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight}/>
                </div>
                <div id={style2.controls}>
                    {/*<button id = "clear-btn">Clear</button>*/}
                    <button id = "quick-fill-btn" className={style2.buttonClass}>Quick Fill</button>
                    <button id = "reset-btn" className={style2.buttonClass}>Reset</button>
                    <button id = "add-btn" className={style2.buttonClass}>Add</button>
                    <button id = "search-btn" className={style2.buttonClass}>Search</button>

                    <button id = "Inorder-btn" className={style2.buttonClass}>Inorder Travel</button>
                    <button id = "Postorder-btn" className={style2.buttonClass}>Postorder Travel</button>
                    <button id = "Preorder-btn" className={style2.buttonClass}>Preorder Travel</button>

                    {/*<span id = "speed-label">Animation Speed:</span>
                    <input id = "speed-slider" type="range" min = "0" max = "1.5" step = "0.1" value = "0.3"></input>
                    <a id = "help-label" href = "">Need Help?</a>*/}
                </div>
            </>
        )
    }
}

export default BST_Index
