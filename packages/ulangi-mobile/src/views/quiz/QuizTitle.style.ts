/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import * as _ from 'lodash';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import { ss } from '../../utils/responsive';

export interface QuizTitleStyles {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  icon: ImageStyle;
}

export const baseStyles: QuizTitleStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: ss(26),
    fontFamily: 'JosefinSans-Bold',
    letterSpacing: ss(-0.5),
  },

  subtitle: {
    fontSize: ss(9),
    fontFamily: 'JosefinSans-Bold',
    letterSpacing: ss(0.5),
  },

  icon: {
    marginTop: ss(10),
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    title: {
      color: config.styles.light.primaryTextColor,
    },

    subtitle: {
      color: config.styles.light.secondaryTextColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    title: {
      color: config.styles.dark.primaryTextColor,
    },

    subtitle: {
      color: config.styles.dark.secondaryTextColor,
    },
  }),
);
