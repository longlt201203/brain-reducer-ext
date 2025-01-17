export type RuntimeAction = "getDOMStructure";

export interface RuntimeMessage {
  action: RuntimeAction;
}

export interface RuntimeResponse {
  error?: string;
  data?: unknown;
}
