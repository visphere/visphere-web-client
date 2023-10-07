/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environment';

export default [
  StoreDevtoolsModule.instrument({ logOnly: !!environment.production }),
];
