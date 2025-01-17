import { BaseDataType } from '.';

export type MessageType = {
  title: string;
  user: string;
  message: string;
  acknowledged: boolean;
} & BaseDataType;
