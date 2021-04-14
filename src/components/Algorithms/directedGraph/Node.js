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
        this.drawArrow=this.drawArrow.bind(this);
        this.cost_neighbour={};
    }
    draw(){
        if(this.value==null)
            return
        this.drawNode();
        for(let i in this.connected_line){
            this.draw_edge_new(this.connected_line[i][0],this.connected_line[i][1],this.connected_line[i][2],this.connected_line[i][3]);
        }
        this.next.draw();
    }

    draw_edge_new(x1,y1,x2,y2){
        console.log("Draw");
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.strokeStyle='red';
        this.ctx.stroke();
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

    drawNode() {
        this.ctx.beginPath();
        this.ctx.strokeStyle='red';
        this.ctx.font = "15px Arial";;
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

    draw_edge(x1,y1,x2,y2,neighbour,fg){
        this.ctx.beginPath();
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.strokeStyle='red';
        this.ctx.stroke();
        this.neighbours.push(neighbour);
        //neighbour.neighbours.push(this);
        this.drawArrow(neighbour.value,false,true,8,5,fg);
    }
    drawArrow(balak,a,b,aLength,aWidth,fg){
        //console.log(balak);
        //console.log("balak");
        //console.log(this);
        let x1=this.connected_line[balak][0];
        let y1=this.connected_line[balak][1];
        let x2=this.connected_line[balak][2];
        let y2=this.connected_line[balak][3];

        let dx=x2-x1;
        let dy=y2-y1;

        let angle=Math.atan2(dy,dx);
        let length=Math.sqrt(dx*dx+dy*dy);

        /* Cost*/
        /*
        console.log(cost);
        let c=y1-(dy/dx)*x1;
        let tmp_y=(dy/dx)*x1+c;
        this.ctx.fillText(cost,x1,tmp_y);    
        let md=-(dx/dy);*/
        var cost=Math.floor((Math.sqrt( Math.pow((x1-x2),2) + Math.pow((y1-y2),2)) )/10 );
        var tx1=(x1+x2)/2;
        var ty1=(y1+y2)/2;


        /*End*/

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

        if(fg){
            this.ctx.font = "20px Arial";
            this.ctx.textAlign="up";
            this.ctx.fillText(cost,tx1,ty1);
            this.cost_neighbour[balak]=cost;
            //console.log(this);
        }
    }

    create_obj(max){
        //console.log("Done");
        var array=[];
        for(let i=0;i<max;i++){
            array.push(new Array(max).fill(0));
        }

        let current_node=this;
        var mp_node={};
        while(current_node.value!==null){
            var val=current_node.value;
            mp_node[val]=current_node;
            for(let i=0;i<current_node.neighbours.length;i++){
                array[val][current_node.neighbours[i].value]=1;
            }
            current_node=current_node.next;
        }
        return [array,mp_node];
    }

    create_cost_obj(max){
        var array=[];
        for(let i=0;i<max;i++){
            array.push(new Array(max).fill(Infinity));
        }

        let current_node=this;
        var mp_node={};

        while(current_node.value!==null){
            for(var i in current_node.cost_neighbour){
                array[current_node.value][i]=current_node.cost_neighbour[i];
            }
            current_node=current_node.next;
        }
        //console.log(array)
        return array;
    }

    topologicalSort(arr,mp_node){
        var stack = new Stack();
        
        var visited={}
        for(let i=0;i<arr.length;i++){
            visited[i]=false;
        }
        for(let i=0;i<arr.length;i++){
            if(visited[i]==false){
                this.r_topologicalSort(visited,i,stack,arr);
            }
        }
        //this.r_topologicalSort(visited);
        while (stack.isEmpty() == false) {
            var tmp=stack.top();
            //console.log(stack.top());
            while(true){
                for(var i=0;i<1000;i++){
                    mp_node[tmp].blink();
                }
                break;
            }
            stack.pop();
        }
        //console.log(visited[0]);
        //console.log(stack);
    }

    r_topologicalSort(visited,i,stack,arr){
        visited[i]=true;
        for(let j=0;j<arr.length;j++){
            if(arr[i][j] && !visited[j]){
                this.r_topologicalSort(visited,j,stack,arr);
            }
        }
        stack.push(i);

    }

    blink(){
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

    edge_blink(x1,y1,x2,y2){
        
        setTimeout(
            function(data){ 
                //console.log(data)
                let i= Math.floor(Math.random() * Math.floor(6));
                let j= Math.floor(Math.random() * Math.floor(6));

                data.ctx.beginPath();
                data.ctx.moveTo(x1,y1);
                data.ctx.lineTo(x2,y2);
                data.ctx.strokeStyle='rgb(0, ' + Math.floor(255 - 42.5 * i) + ', ' +Math.floor(255 - 42.5 * j) + ')';
                data.ctx.stroke();
            }, 
            1000,
            this);
    }

}
export default  Node;