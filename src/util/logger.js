import { Log } from "../database/index ";
export class Logger {
  success(title, description) {
    Log.create({
      title: title,
      description: description,
      log_type: "SUCCESS"
    });
  }

  error(title, description) {
    Log.create({
      title: title,
      description: description,
      log_type: "ERROR"
    });
  }

  info(title, description) {
    Log.create({
      title: title,
      description: description,
      log_type: "INFO"
    });
  }

  FATAL(title, description) {
    Log.create({
      title: title,
      description: description,
      error_type: "FATAL"
    });
  }
}
