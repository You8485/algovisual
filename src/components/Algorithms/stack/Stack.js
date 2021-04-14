class Stack{

    constructor(){
        this.items=[];

    }

    
    isEmpty(){
        return this.items.length==0; 
    }
    push(item){
        this.items.push(item);
    }
    pop(){
        return this.items.pop();
    }
    top(){
        return this.items[this.items.length-1]
    }
}
export default Stack;