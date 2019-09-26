import * as React from 'react'

export interface IClientProps  {
  client: any;
}

export interface IInputProps {
  type?: string;
  value: string | number;
  name?: string;
  placeholder?: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface IButtonProps {
  text?: string;
  onClick?(data?: any): void;
}