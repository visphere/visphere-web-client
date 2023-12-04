/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export type ExternalContentType = 'image' | 'icon';

export type RadioElement = {
  id: string | number;
  leftLabel: string;
  rightContent?: {
    type: ExternalContentType;
    referenceValue: string;
  };
  isSelected: boolean;
};
