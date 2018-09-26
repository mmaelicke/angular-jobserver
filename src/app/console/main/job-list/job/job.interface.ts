
export interface Job {
  _id: string;
  created: Date;
  started: Date;
  finished: Date;
  time_sec?: string;
  result?: any;
  data?: any;
  script?: any;
  [x: string]: any;
}
