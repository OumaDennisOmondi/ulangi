/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import { ls, ss } from '../../utils/responsive';

export interface MultipleChoiceFormStyles {
  multiple_choice_container: ViewStyle;
  vocabulary_text_container: ViewStyle;
  vocabulary_text: TextStyle;
  accessory: TextStyle;
  answer_container: ViewStyle;
  answer_touchable: ViewStyle;
  meaning_container: ViewStyle;
  meaning: TextStyle;
  uncheck: ImageStyle;
}

export const baseStyles: MultipleChoiceFormStyles = {
  multiple_choice_container: {
    marginHorizontal: ls(16),
    borderRadius: ss(10),
  },

  vocabulary_text_container: {
    paddingHorizontal: ss(16),
    paddingVertical: ss(14),
  },

  vocabulary_text: {
    fontSize: ss(15),
    fontWeight: 'bold',
  },

  accessory: {},

  answer_container: {
    borderTopWidth: 1,
  },

  answer_touchable: {
    paddingHorizontal: ss(16),
    paddingVertical: ss(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  meaning_container: {
    flexShrink: 1,
    paddingVertical: ss(2),
  },

  meaning: {
    fontSize: ss(15),
  },

  uncheck: {
    marginRight: ss(8),
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    multiple_choice_container: {
      backgroundColor: config.styles.light.secondaryBackgroundColor,
    },

    vocabulary_text: {
      color: config.styles.light.primaryTextColor,
    },

    accessory: {
      color: config.styles.light.secondaryTextColor,
    },

    answer_container: {
      borderTopColor: config.styles.light.primaryBackgroundColor,
    },

    meaning: {
      color: config.styles.light.primaryTextColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    multiple_choice_container: {
      backgroundColor: config.styles.dark.primaryBackgroundColor,
    },

    vocabulary_text: {
      color: config.styles.dark.primaryTextColor,
    },

    accessory: {
      color: config.styles.dark.secondaryTextColor,
    },

    answer_container: {
      borderTopColor: config.styles.dark.secondaryBackgroundColor,
    },

    meaning: {
      color: config.styles.dark.primaryTextColor,
    },
  }),
);
