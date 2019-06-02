import { Log } from "./schema";

export default class Logger {
    info = (desciprtion:string): void => {
        let log_object = new Log({
            desciprtion: desciprtion,
            type: 'INFO'
        });
        log_object.save();
    }

    success = (description: string): void => {
        let log_object = new Log({
            desciprtion: description,
            type: 'SUCCESS'
        });
        log_object.save();
    }

    error = (description: string): void => {
        let log_object = new Log({
            desciprtion: description,
            type: 'ERROR'
        });
        log_object.save();
    }
}