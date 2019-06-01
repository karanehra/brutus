import Worker from "./worker.interface";

export default interface Queue {
    is_running: boolean,
    workers: Worker[],
    next(): void,
    add_worker(worker:Worker): void,
}