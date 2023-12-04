/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { RadioElement } from '../types/radio-element.type';

export type RelatedValueReqDto = {
  relatedValue: string | null;
};

export type RelatedWithElements = {
  elements: RadioElement[];
  isSelected: boolean;
  definedValue: string;
};
