import Node from './Node'
class Graph{
    constructor(ctx){
        this.ctx=ctx;
        this.first= new Node(this.ctx);
        this.current=0;
    }
    add_node(x,y){
        this.first.add_node(x,y,this.current);
        this.current+=1;
    }
    add_edge(prv_x,prv_y,x,y){
        var node1=this.findnode(prv_x,prv_y);
        var node2=this.findnode(x,y);
        let r=15;
        //console.log(parseInt(prv_x)+' '+x+' '+prv_y+' '+y);
        var coo1;
        var coo2;
        if(node1!==null && node2!==null){
            let m=this.slop(prv_x,x,prv_y,y);
            if(m==Infinity){
                if(prv_y>y){
                    prv_y-=15;
                    y+=15;
                }
                else{
                    prv_y+=15;
                    y-=15;
                }
                node1.draw_edge(prv_x,prv_y,x,y,node2);
                node1.connected_line[node2.value]=[prv_x,prv_y,x,y];
                node2.connected_line[node1.value]=[x,y,prv_x,prv_y];
            }
            else{
                //console.log(m);
                let c=prv_y-(m*prv_x);
                //console.log(c);
                coo1=this.setCoordinates(node1,m,c,x,y);
                coo2=this.setCoordinates(node2,m,c,prv_x,prv_y);
                node1.draw_edge(coo1[0],coo1[1],coo2[0],coo2[1],node2);  
                node1.connected_line[node2.value]=[coo1[0],coo1[1],coo2[0],coo2[1]];
                node2.connected_line[node1.value]=[coo2[0],coo2[1],coo1[0],coo1[1]]; 
                //console.log(node1)
            }
        }
        else{}
    }
    slop(x1,x2,y1,y2){
        if(x1==x2)
            return Infinity;
        return (y2-y1)/(x2-x1);
    }
    bfs(){
        this.ctx.clearRect(0, 0, 1432, 980);
        this.first.draw_edgeAgain();
        this.first.draw();
        this.first.bfs(this.current,0);
    }
    dfs(){
        this.ctx.clearRect(0, 0, 1432, 980);
        this.first.draw_edgeAgain();
        this.first.draw();
        this.first.dfs(this.current,0);
    }
    findnode(x,y){    
        var current_node=this.first;
        while(current_node.value!=null){
            var x1=parseInt(x);
            var x2=parseInt(current_node.x);
            var y1=parseInt(y);
            var y2=parseInt(current_node.y);
            if(this.distance(x1,x2,y1,y2)<=15){
                return current_node;
            }
            current_node=current_node.next;
        }
        return null;
    }
    distance(x1,x2,y1,y2){
        return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
    }
    setCoordinates(node1,m,c,x,y){
        let r=15;
        let h=parseInt(node1.x);
        let k=parseInt(node1.y);
        let a=(1+m*m);
        let b=(2*m*c)-(2*h)-(2*k*m);
        let c_d=(h*h)+(k*k)-(r*r)-(2*k*c)+(c*c);

        let d=(b*b)-(4*a*c_d);
        if(d>=0){
            let xp1=(-b+Math.sqrt(d))/(2*a);
            let xp2=(-b-Math.sqrt(d))/(2*a);
            let yp1=m*xp1+c;
            let yp2=m*xp2+c;
            if(this.distance(xp1,x,yp1,y)<=this.distance(xp2,x,yp2,y)){
                return [xp1,yp1]
            }
            else{
                return [xp2,yp2];
            }
        }
        else{}
    }

    node_bfs(start){
        this.ctx.clearRect(0, 0, 1432, 980);
        this.first.draw_edgeAgain();
        this.first.draw();
        this.first.bfs(this.current,start);
        console.log(start);
    }

    node_dfs(start){
        this.ctx.clearRect(0, 0, 1432, 980);
        this.first.draw_edgeAgain();
        this.first.draw();
        this.first.dfs(this.current,start);
        console.log(start);
    }
}

export default Graph;