import Queue from "../interfaces/queue.interface";
import Worker from "../interfaces/worker.interface";

export default class WorkerQueue implements Queue {
    is_running: boolean = false;
    workers: Worker[] = [];
    
    constructor(){
        this.next = this.next.bind(this);
    }

    next(): void {
        this.is_running = true;
        let worker = this.workers.shift();
        if(worker){
            worker.execute(this.next);
        }
    }

    add_worker(worker: Worker): void {
        this.workers.push(worker);
        if(!this.is_running){
            this.next();
        }
    }

    
}