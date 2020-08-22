/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

declare module "xml-formatter" {
  function format(
    xml: string,
    options?: {
      debug?: boolean;
      indentation?: string;
      stripComments?: boolean;
    }
  ): string;

  export = format;
}
