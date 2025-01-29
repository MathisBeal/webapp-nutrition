type Option = {
  value: string;
  text: string;
}

type Field = {
  name: string;
  value: string | number;
  type: string;
  options?: Option[];
}

export type { Option, Field };
