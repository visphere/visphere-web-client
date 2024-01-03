/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type MessagePayloadReqDto = {
  fullName: string;
  profileImageUrl: string;
  message: string;
};

export type FileAttachment = {
  path: string;
  originalName: string;
  mimeType: string;
};

export type MessagePayloadResDto = {
  userId: number;
  messageId: string;
  fullName: string;
  profileImageUrl: string;
  sendDate: string;
  message: string;
  accountDeleted: boolean;
  attachments: FileAttachment[];
};

export type MessagesResDto = {
  messages: MessagePayloadResDto[];
  paginationState: string;
  paginationEnd: boolean;
};

export type BlobFile = {
  file: File;
  isImage: boolean;
  imageSrc: string;
};
