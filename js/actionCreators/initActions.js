/* @flow */
'use strict'

import type { Action } from '../types'

export const load = (): Action => ({
  type: 'load-connection'
})