export type RuntimeAction = "getDOMStructure" | "getPageInfo";

export interface RuntimeMessage<T = unknown> {
  action: RuntimeAction;
  data?: T;
}

export interface RuntimeResponse<T = unknown> {
  error?: string;
  data?: T;
}
