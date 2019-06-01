export default interface Worker {
    name : Readonly<string>,
    is_executing: boolean,
    is_finished: boolean,
    feed_url: string,
    execute(): void

}