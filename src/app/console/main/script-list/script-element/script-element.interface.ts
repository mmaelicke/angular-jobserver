export interface ScriptElement {
  name: string;
  description?: string;
  parameters?: string[];
  [x: string]: any;
}
