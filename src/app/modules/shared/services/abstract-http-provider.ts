/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';

export abstract class AbstractHttpProvider {
  protected _infraApiPath = environment.infraApiGatewayUrl;
}
