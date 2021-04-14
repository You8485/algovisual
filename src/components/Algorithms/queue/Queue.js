class Queue{
    constructor(){
            this.items=[];
    }
    isEmpty(){
        if(this.items.length==0)
            return true;
        return false;
    }
    isFull(){
        if(this.items.length===this.capacity)
            return true;
        return false;
    }

    enqueue(item){
        this.items.push(item);
    }

    dequeue(){
        if(this.isEmpty())
            return null;
        return this.items.shift();
    }

    front(){
        if(this.isEmpty())
            return null;
        return this.items[0];
    }

    printQueue(){
        var str='';
        for(let i=0;i<this.items.length;i++){
            str+=(this.items[i]+' ');
        }
        return str;
    }

}
export default Queue;