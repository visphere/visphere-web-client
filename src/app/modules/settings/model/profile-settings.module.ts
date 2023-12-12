/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ImageType } from '../types/image-type';

export type MessageWithResourcePathResDto = {
  message: string;
  resourcePath: string;
};

export type UpdateProfileColorReqDto = {
  color: string;
};

export type ProfileImageDetailsResDto = {
  imageType: ImageType;
};

export type ProfileDetails = {
  imageType: ImageType;
  availableColors: string[];
};
