import Queue from '../queue/Queue'
import Stack from '../stack/Stack'
class Node{

    constructor(ctx){
        this.ctx=ctx;

        this.value=null;
        this.next=null;

        this.x=null;
        this.y=null;

        this.neighbours=[];
        this.connected_line={};
        
        
    }

    add_node(x,y,current){
        if(this.value===null){
            this.value=current;
            this.x=x;
            this.y=y;

            this.drawNode();

            this.next=new Node(this.ctx);
        }
        else{
            this.next.add_node(x,y,current);
        }
    }

    draw(){
        if(this.value==null)
            return
        this.drawNode();
        this.next.draw();
    }

    draw_edgeAgain(){
        if(this.value==null)
            return
        for(let i in this.connected_line){
            this.ctx.beginPath();
            this.ctx.moveTo(this.connected_line[i][0],this.connected_line[i][1]);
            this.ctx.lineTo(this.connected_line[i][2],this.connected_line[i][3]);
            this.ctx.strokeStyle='red';
            this.ctx.stroke();
        }
        //this.drawNode();
        this.next.draw_edgeAgain();
    }

    drawNode() {
        
        this.ctx.beginPath();
        
        this.ctx.strokeStyle='red';
        
        this.ctx.arc(this.x, this.y, 15, 0, 2* Math.PI);
        this.ctx.lineWidth=5;
        this.ctx.strokeWidth="50";
        this.ctx.stroke();
        this.ctx.fillStyle='black';
        this.ctx.fontSize="1000px";
        this.ctx.textAlign="center";
        this.ctx.fillText(this.value,this.x,this.y);
        this.ctx.closePath();  
    }

    draw_edge(x1,y1,x2,y2,neighbour){
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.strokeStyle='red';
        this.ctx.stroke();
        this.neighbours.push(neighbour);
        neighbour.neighbours.push(this);
    }

    bfs(total,start){
        //console.log(total)
        var gp=[]
        var gp_obj=[]
        for(let i=0;i<total;i++){
            gp.push(new Array(total).fill(0))
        }
        var current_node=this;
        var mp_node={}
        while(current_node.value!==null){
            var val=current_node.value;
            mp_node[val]=current_node;
            for(let i=0;i<current_node.neighbours.length;i++){
                gp[val][current_node.neighbours[i].value]=1;
            }
            current_node=current_node.next;
        }
        //console.log(gp);

        this.visual_bfs(gp,mp_node,start);
        
    }
    

    visual_bfs(gp,mp_node,start){
        console.log(gp);
        if(mp_node[start]===null){
            return;
        }
        var queue = new Queue();
        var mp_visited={};

        
        var child_parent={};

        queue.enqueue(start);
        mp_visited[start]=1;
        while(!queue.isEmpty()){
            var front=queue.front();
            for(let i=0;i<gp[front].length;i++){
                if(gp[front][i]){
                    if(!mp_visited[i]){
                        queue.enqueue(i);
                        mp_visited[i]=1;
                        child_parent[i]=front;
                    }
                }
            }
            var tmp=queue.dequeue();
            

            while(true){
                for(var i=0;i<1000;i++){
                    mp_node[tmp].blink();
                }
                break;
            }
            if(child_parent[front]==undefined){
                //console.log("Unf")
            }
            else{
                console.log(child_parent[tmp]);
                console.log("Op")
                mp_node[tmp].drawArrow(child_parent[tmp],true,false,8,5);
            }
        }
    }

    dfs(total,start){
        var gp=[]
        var gp_obj=[]
        for(let i=0;i<total;i++){
            gp.push(new Array(total).fill(0))
        }
        var current_node=this;
        var mp_node={}
        while(current_node.value!==null){
            var val=current_node.value;
            mp_node[val]=current_node;
            for(let i=0;i<current_node.neighbours.length;i++){
                gp[val][current_node.neighbours[i].value]=1;
            }
            current_node=current_node.next;
        }
        this.visual_dfs(gp,mp_node,start);
    }

    visual_dfs(gp,mp_node,start){

        var stack=new Stack();
        var queue=new Queue();
        var mp_visited={};

        var child_parent={};
        
        if(mp_node[start]===null){
            return;
        }
        stack.push(start);
        mp_visited[start]=0;
        queue.enqueue(start);
        while(!stack.isEmpty()){
            var tp=stack.top();
            stack.pop();
            if(mp_visited[tp]!==1){
                queue.enqueue(tp);
                mp_visited[tp]=1;
                while(true){
                    for(var i=0;i<1000;i++){
                        mp_node[tp].blink();
                    }
                    break;
                }

                if(child_parent[tp]==undefined){
                    //console.log("Unf")
                }
                else{
                    console.log(child_parent[tp]);
                    console.log("Op")
                    mp_node[tp].drawArrow(child_parent[tp],true,false,8,5);
                }

            }
            for(let i=0;i<gp[tp].length;i++){
                if(gp[tp][i]){
                    if(!mp_visited[i]){
                        stack.push(i);
                        child_parent[i]=tp;
                    }
                }
            }
            
        }
        
        //console.log(queue.printQueue());
    }

    blink(){
        //console.log(cc)
        //console.log("Blink")
        //console.log(this);
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

    drawArrow(papa,a,b,aLength,aWidth){
        console.log(papa);
        console.log("Papa")
        let x1=this.connected_line[papa][0];
        let y1=this.connected_line[papa][1];
        let x2=this.connected_line[papa][2];
        let y2=this.connected_line[papa][3];

        let dx=x2-x1;
        let dy=y2-y1;

        let angle=Math.atan2(dy,dx);
        let length=Math.sqrt(dx*dx+dy*dy);

        this.ctx.translate(x1,y1);
        this.ctx.rotate(angle);

        //let aLength=8;
        //let aWidth=5;

        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(length,0);
        if(a){
            this.ctx.moveTo(aLength,-aWidth);
            this.ctx.lineTo(0,0);
            this.ctx.lineTo(aLength,aWidth);
        }
        if(b){
            this.ctx.moveTo(length-aLength,-aWidth);
            this.ctx.lineTo(length,0);
            this.ctx.lineTo(length-aLength,aWidth);
        }
        //
        this.ctx.stroke();
        this.ctx.setTransform(1,0,0,1,0,0);
        /*let dist=10;
        if(x1!=x2){
            

            this.ctx.beginPath();
            this.ctx.moveTo(plx1,ply1);
            this.ctx.lineTo(plx2,ply2);
            this.ctx.strokeStyle='black';
            this.ctx.stroke();




        }*/
        

        //let [x1,x2,y1,y2]=this.connected_line[papa.value];
    }


}

export default Node;