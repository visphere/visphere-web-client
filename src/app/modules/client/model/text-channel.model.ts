/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type CreateTextChannelReqDto = {
  name: string;
};

export type TextChannelDetailsResDto = {
  name: string;
};

export type TextChannelResDto = {
  id: number;
  name: string;
};
