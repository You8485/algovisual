import Node from './Node'
class DirectedGraph{
    constructor(ctx){
        this.ctx=ctx;
        this.first = new Node(this.ctx);
        this.current=0;
    }
    add_node(x,y){
        this.first.add_node(x,y,this.current);
        this.current+=1;
        //console.log(this);
        //console.log("Op")
    }

    add_edge(prv_x,prv_y,x,y,fg){
        var node1=this.findnode(prv_x,prv_y);
        var node2=this.findnode(x,y);
        let r=15;
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
                node1.draw_edge(prv_x,prv_y,x,y,node2,fg);
                node1.connected_line[node2.value]=[prv_x,prv_y,x,y];
                node2.connected_line[node1.value]=[x,y,prv_x,prv_y];
            }
            else{
                //console.log(m);
                let c=prv_y-(m*prv_x);
                //console.log(c);
                coo1=this.setCoordinates(node1,m,c,x,y);
                coo2=this.setCoordinates(node2,m,c,prv_x,prv_y);
                node1.connected_line[node2.value]=[coo1[0],coo1[1],coo2[0],coo2[1]];
                node2.connected_line[node1.value]=[coo2[0],coo2[1],coo1[0],coo1[1]]; 
                node1.draw_edge(coo1[0],coo1[1],coo2[0],coo2[1],node2,fg);  
                
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

    topologicalSort(){
        this.first.draw();
        var ans=this.first.create_obj(this.current);
        console.log(ans[0]);
        //console.log(ans[1]);
        let tmp=this.findCycle();
        console.log(tmp)
        if(!tmp)
            this.first.topologicalSort(ans[0],ans[1]);
        else
            alert("Loop is present");
    }

    findCycle(){
        //this.first.draw();
        var ans=this.first.create_obj(this.current);
        var vec=ans[0];
        var visited={};
        var recvisited={};
        for(let i=0;i<vec.length;i++){
            visited[i]=false;
            recvisited[i]=false;
        }
        for(let i=0;i<vec.length;i++){
            if(this.isCycle(vec,i,visited,recvisited)){
                return true;
            }
        }
        return false;
    }
    isCycle(vec,v,visited,recvisited){
        console.log(recvisited)
        if(visited[v]==false){
            visited[v]=true;
            recvisited[v]=true;
            
            for(let i=0;i<vec[v].length;i++){
                if(vec[v][i]==1 && (!visited[i]) && this.isCycle(vec,i,visited,recvisited) ){
                    return true;
                }
                else if(recvisited[i]  && vec[v][i]==1){
                    return true;
                }
            }
            console.log(v);
            //console.log(visited);
        }
        recvisited[v]=false;
        return false;
    }

    dijkstra_algo(){
        console.log("Algo");
        this.first.draw();
        //this.first.draw_edge();
        var gp=this.first.create_obj(this.current);
        console.log(gp[0]);
        console.log(gp[1]);
        var cost_array=this.first.create_cost_obj(this.current);
        console.log(cost_array);
        return this.dijkstra(gp[0],gp[1],cost_array,0);
    }

    djMinDistance(dist,sptSet){
        var min=Infinity;
        var min_index;

        for(let i=0;i<this.current;i++){
            if(sptSet[i]==false && dist[i]<=min){
                min=dist[i];
                min_index=i;
            }
        }

        return min_index;
    }

    dijkstra(connection,nodes,cost,src){
        var dist=[];
        var sptSet=[];

        for(var i=0;i<this.current;i++){
            dist.push(Infinity);
            sptSet.push(false);
        }

        dist[src]=0;

        
        while(true){
            for(var i=0;i<1000;i++){
                nodes[src].blink();
            }
            break;
        }

        for(var count=0;count<this.current;count++){
            var u=this.djMinDistance(dist,sptSet);
            sptSet[u]=true;

            while(true){
                for(var i=0;i<1000;i++){
                    nodes[u].blink();
                }
                break;
            }

            
            for(let i=0;i<this.current;i++){
                if(!sptSet[i] && connection[u][i] && dist[u]!=Infinity && dist[u]+cost[u][i]<dist[i]){
                    dist[i]=dist[u]+cost[u][i];

                    let x1=nodes[i].connected_line[u][0];
                    let y1=nodes[i].connected_line[u][1];
                    let x2=nodes[i].connected_line[u][2];
                    let y2=nodes[i].connected_line[u][3];
                
                    while(true){
                        for(var j=0;j<1000;j++){
                            nodes[u].blink();
                            nodes[u].edge_blink(x1,y1,x2,y2);
                        }
                        break;
                    }
                }
            }
        }
        console.log(dist);
        return dist;
    }

}

export default  DirectedGraph;