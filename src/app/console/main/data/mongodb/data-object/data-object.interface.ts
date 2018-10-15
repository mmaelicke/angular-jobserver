export interface DataObject {
  id: string;
  datatype: string;
  created: Date;
  user?: string;
  data?: any;
  [x: string]: any;
}
