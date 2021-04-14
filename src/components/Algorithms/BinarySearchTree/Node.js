
class Node{
static HORIZONTALSPACING=32;
static VERTICALSPACING=75;

    constructor(ctx,parent=null){
        //console.log("Node")
        this.value=null;

        this.ctx=ctx;

        this.leftNode=null;
        this.rightNode=null;

        //this.graphics=graphics;

        this.parent=parent;

        this.x=0;
        this.y=0;

        this.rightSpacing=0;
        this.leftSpacing=0;

        this.cumulativeRightSpacing = 0;
        this.cumulativeLeftSpacing = 0;

        this.prv_x=this.x;
        this.prv_y=this.y;
    }

    search(value){
        setTimeout(
        ()=>{
            if(this.value==null || this==null){
                return ;
            }
            if(value<this.value){
            this.blink();
            this.leftNode.search(value);

        }
        else if(value>this.value){
            this.blink();
            this.rightNode.search(value);

        }
        else{
            this.blink();
            //console.log("==")
            return true;
        }
        },
        500)

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    blink(){
        //console.log(cc)
        //console.log("Blink")

        setTimeout(
            function(data){ 
                //console.log(cc)
                let i= Math.floor(Math.random() * Math.floor(6));
                let j= Math.floor(Math.random() * Math.floor(6));
                data.ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                         Math.floor(255 - 42.5 * j) + ')';
                data.ctx.beginPath();
                data.ctx.arc(data.x, data.y, 15, 0, Math.PI * 2, true);
                data.ctx.stroke();
            }, 
            1000,
            this);
    }
    isFilled(){
        return this.value!==null;
    }

    add_value(value){
        
        if(!this.isFilled()){
            this.value=value;
            //this.draw();
            this.leftNode= new Node(this.ctx,this);
            this.rightNode=new Node(this.ctx,this);
            //this.blink();
            return this;
        }
        else if(value<this.value){

            var initialLeftSpacing = this.leftNode.cumulativeRightSpacing+Node.HORIZONTALSPACING;

            var shiftedNode = this.leftNode.add_value(value);

            this.leftSpacing = this.leftNode.cumulativeRightSpacing
                + Node.HORIZONTALSPACING;
            
            this.cumulativeLeftSpacing = this.leftNode.cumulativeLeftSpacing
                + this.leftSpacing;
            
            if(this.leftSpacing !== initialLeftSpacing) {
                return this.leftNode;
            }
            //this.blink();
            return shiftedNode;
            //this.lefNode.add_value(value);
        }
        else if(value>this.value){
            var rightSpacing = this.rightNode.cumulativeLeftSpacing
                + Node.HORIZONTALSPACING;

            var shiftedNode = this.rightNode.add_value(value);

            this.rightSpacing = this.rightNode.cumulativeLeftSpacing
            + Node.HORIZONTALSPACING;

            this.cumulativeRightSpacing = this.rightNode.cumulativeRightSpacing
                + this.rightSpacing;

            if(this.rightSpacing !== rightSpacing) {
                return this.rightNode;
            }
            //this.blink();
            return shiftedNode;
        }
        else{

        }
    }

    setCoordinates(x,y){
        if(this.isFilled()){
            if(typeof x === "undefined" && typeof y==="undefined"){
                if(this.value<this.parent.value){
                    //this.prv_x=this.x;
                    this.x=this.parent.x-this.parent.leftSpacing;
                }
                else{
                    //this.prv_x=this.x;
                    this.x=this.parent.x+this.parent.rightSpacing;
                }
                //this.prv_y=this.y;
                this.y=this.parent.y+Node.VERTICALSPACING;
            }
            
            else{

                //this.prv_x=this.x;
                //this.prv_y=this.y;
                this.x=x;
                this.y=y;
            }
            this.leftNode.setCoordinates();
            this.rightNode.setCoordinates();
        }
    }


    delete_parent(){
        //console.log(this.x+' '+this.prv_x);
        this.ctx.clearRect(this.prv_x-15-1, this.prv_y-15-1, 32, 32);
    }

    drawNode() {
        
        this.ctx.beginPath();
        
        this.ctx.strokeStyle='yellow';
        
        this.ctx.arc(this.x, this.y, 15, 0, 2* Math.PI);
        this.ctx.lineWidth=5;
        this.ctx.strokeWidth="50";
        this.ctx.stroke();
        this.ctx.fillStyle='black';
        this.ctx.fontSize="1000px";
        this.ctx.textAlign="center";
        this.ctx.fillText(this.value,this.x,this.y);
        this.ctx.closePath();
        this.prv_x=this.x;
        this.prv_y=this.y;


        
    }

    hasParent(){
        return this.parent !== null;
    }

    drawEdge(){
        if(this.hasParent()){
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y-15);
            this.ctx.lineTo(this.parent.x,this.parent.y+15);
            this.ctx.strokeStyle='red';
            this.ctx.stroke();
        }
    }
   
    draw(){
        
        if(this.isFilled()) {
            this.leftNode.draw();
            this.rightNode.draw();

            this.drawNode();
            this.drawEdge();
            
        }
    }

    
    
    inorder(){
        if(this.value==null)
            return;
        this.leftNode.inorder();
        console.log(this.value);
        
        let timeStart = new Date().getTime(); 
        while (true) { 
            setTimeout(
                function(data){ 
                    //console.log(cc)
                    let i= Math.floor(Math.random() * Math.floor(6));
                    let j= Math.floor(Math.random() * Math.floor(6));
                    data.ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                             Math.floor(255 - 42.5 * j) + ')';
                    data.ctx.beginPath();
                    data.ctx.arc(data.x, data.y, 15, 0, Math.PI * 2, true);
                    data.ctx.stroke();
                }, 
                100,
                this);
            let elapsedTime = new Date().getTime() - timeStart; 
            if (elapsedTime > 3) { 
                break; 
            } 
        } 

        this.rightNode.inorder();
    }

    postorder(){
        if(this.value==null)
            return null;
        this.leftNode.postorder();
        this.rightNode.postorder();

        let timeStart = new Date().getTime(); 
        while (true) { 
            setTimeout(
                function(data){ 
                    //console.log(cc)
                    let i= Math.floor(Math.random() * Math.floor(6));
                    let j= Math.floor(Math.random() * Math.floor(6));
                    data.ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                             Math.floor(255 - 42.5 * j) + ')';
                    data.ctx.beginPath();
                    data.ctx.arc(data.x, data.y, 15, 0, Math.PI * 2, true);
                    data.ctx.stroke();
                }, 
                1000,
                this);
            let elapsedTime = new Date().getTime() - timeStart; 
            if (elapsedTime > 10) { 
                break; 
            } 
        }
        //this.blink();
        console.log(this.value)
    }

    /*preorder(){
        if(this.value==null)
            return null;
        let timeStart = new Date().getTime(); 
        while (true) { 
            setTimeout(
                function(data){ 
                    //console.log(cc)
                    let i= Math.floor(Math.random() * Math.floor(6));
                    let j= Math.floor(Math.random() * Math.floor(6));
                    data.ctx.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +
                             Math.floor(255 - 42.5 * j) + ')';
                    data.ctx.beginPath();
                    data.ctx.arc(data.x, data.y, 15, 0, Math.PI * 2, true);
                    data.ctx.stroke();
                }, 
                10,
                this);
            let elapsedTime = new Date().getTime() - timeStart; 
            if (elapsedTime > 5) { 
                break; 
            } 
        }
        //this.blink();
        this.leftNode.preorder();
        this.rightNode.preorder();
        console.log(this.value)
    }*/

    preorder(){
        //setTimeout(
          //  ()=>{
                console.log(this)
                let timeStart = new Date().getTime();
                if(this.value==null){
                    return;
                }
                while(true){
                    for(var i=0;i<1000;i++){
                        this.blink()
                    }
                    break;
                }
                
            //}
        //,1000);
        this.leftNode.preorder();
        this.rightNode.preorder();
    }
    
}

export default Node;