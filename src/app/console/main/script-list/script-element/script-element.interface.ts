export interface ScriptElement {
  type: string;
  name: string;
  description?: string;
  parameters?: string[];
  [x: string]: any;
}
