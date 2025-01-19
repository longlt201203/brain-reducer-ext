export interface DOMStructureObject {
  tagName: string;
  id: string;
  class: string;
  content: string;
  parent: DOMStructureObject | null;
  children: DOMStructureObject[];
}

export interface LinkInfo {
  href: string;
  text: string;
}

export interface PageInfo {
  links: LinkInfo[];
  media: string[];
  text: string[];
  import: string[];
}
