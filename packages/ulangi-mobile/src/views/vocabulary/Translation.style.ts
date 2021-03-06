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

export interface TranslationStyles {
  definition_container: ViewStyle;
  definition_content_container: ViewStyle;
  meaning_container: ViewStyle;
  meaning_text: TextStyle;
  add_button_container: ViewStyle;
}

export const baseStyles: TranslationStyles = {
  definition_container: {
    marginHorizontal: ss(8),
    paddingVertical: ss(16),
    paddingHorizontal: ss(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  definition_content_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  meaning_container: {
    flexShrink: 1,
  },

  meaning_text: {
    fontSize: ss(15),
  },

  add_button_container: {
    marginLeft: ss(8),
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    definition_container: {
      borderBottomColor: config.styles.light.primaryBorderColor,
    },

    meaning_text: {
      color: config.styles.light.primaryTextColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    definition_container: {
      borderBottomColor: config.styles.dark.primaryBorderColor,
    },

    meaning_text: {
      color: config.styles.dark.primaryTextColor,
    },
  }),
);
