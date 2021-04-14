import Node from './Node.js'

class Tree{
    constructor(x,y,ctx){

        this.x=x;
        this.y=y;
        this.ctx=ctx;

        
        this.root=new Node(ctx);

        this.node = null;
        this.animationInterval=null;

        this.running=false;

        

    }

    Qfill(arr){
        console.log(arr)
        for(let i=0;i<arr.length;i++)
            this.add_value(arr[i],0)
        this.draw();
        
    }
    

    add_value(value,qfill){
        console.log(value)
        if(qfill!==0)
            this.search(value)
        var shiftedNode=this.root.add_value(value);
        console.log(shiftedNode.value)
        this.setCoordinates(shiftedNode);
        
        this.draw();
    }

    setCoordinates(node){
        if(node===this.root){
            node.setCoordinates(this.x,this.y);
        }
        else{
            node.setCoordinates();
        }
        
    }

    /*resetVisuals(){
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.root.resetVisuals();
    }
*/

    draw(){
        console.log("Draw")
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        if(this.root.isFilled()){
            this.root.draw();
        }
        
        
    }
    
    search(value){
        console.log(this.root.value)
        var ans;
        if(this.root.value===null){
            return null;
        }
        else{
            ans=this.root.search(value);
        }
        if(ans==false)
            return false;
        this.draw();
    }

    inorder(){
        this.draw();
        this.root.inorder();
        
    }

    postorder(){
        this.draw();
        this.root.postorder();
    }

    preorder(){
        this.draw();
        this.root.preorder();
    }
    
}

export default Tree;

//addValueVisual -> startAnimation -> (addValurFrame,.....)->