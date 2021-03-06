/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import { ss } from '../../utils/responsive';

export interface DiscoverNavButtonStyles {
  selected_text: TextStyle;
  text: TextStyle;
  count: TextStyle;
  selected_count: TextStyle;
  touchable: ViewStyle;
  selected_touchable: ViewStyle;
}

export const baseStyles: DiscoverNavButtonStyles = {
  selected_text: {},

  text: {
    fontWeight: 'bold',
    fontSize: ss(14),
  },

  count: {
    paddingLeft: ss(5),
  },

  selected_count: {},

  touchable: {
    marginBottom: -StyleSheet.hairlineWidth,
    paddingHorizontal: ss(10),
    paddingTop: ss(8),
    paddingBottom: ss(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: ss(8),
    flex: 1,
  },

  selected_touchable: {
    borderBottomColor: config.styles.primaryColor,
    borderBottomWidth: ss(2),
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    selected_text: {
      color: config.styles.light.primaryTextColor,
    },

    text: {
      color: config.styles.light.secondaryTextColor,
    },

    count: {
      color: config.styles.light.secondaryTextColor,
    },

    selected_count: {
      color: config.styles.light.primaryTextColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    selected_text: {
      color: config.styles.dark.primaryTextColor,
    },

    text: {
      color: config.styles.dark.secondaryTextColor,
    },

    count: {
      color: config.styles.dark.secondaryTextColor,
    },

    selected_count: {
      color: config.styles.dark.primaryTextColor,
    },
  }),
);
