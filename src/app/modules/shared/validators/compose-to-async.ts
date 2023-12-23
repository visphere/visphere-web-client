/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */

export const composeToAsync = (validator: any) => (control: any) =>
  Promise.resolve(validator(control));
