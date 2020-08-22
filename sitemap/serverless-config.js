/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

module.exports.project = () => {
  if (process.env.ENVIRONMENT === "production") {
    return "blerp-cf7ae";
  }

  return "blerp-staging-ac0d7";
};
