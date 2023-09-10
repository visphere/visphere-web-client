/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environment';

export default [
  StoreDevtoolsModule.instrument({ logOnly: !!environment.production }),
];
