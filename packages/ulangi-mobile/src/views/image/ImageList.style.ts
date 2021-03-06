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
import {
  darkStyles as defaultSelectableImageDarkStyles,
  lightStyles as defaultSelectableImageLightStyles,
} from './SelectableImage.style';

export interface ImageListStyles {
  container: ViewStyle;
  content_container: ViewStyle;
  header_container: ViewStyle;
  header_text: TextStyle;
  empty_container: ViewStyle;
  empty_text: TextStyle;
  activity_indicator: ViewStyle;
  highlighted: TextStyle;
}

export const imagePadding = ss(4);
export const numColumns = 3;

export const baseStyles: ImageListStyles = {
  container: {
    flex: 1,
  },

  content_container: {
    paddingHorizontal: imagePadding,
  },

  header_container: {
    marginHorizontal: -imagePadding,
    marginBottom: imagePadding,
    paddingHorizontal: ss(16),
    paddingVertical: ss(9),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  header_text: {
    fontSize: ss(12),
  },

  empty_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ss(16),
    paddingVertical: ss(12),
  },

  empty_text: {
    fontSize: ss(16),
  },

  activity_indicator: {
    marginTop: ss(16),
    flexDirection: 'row',
    alignItems: 'center',
  },

  highlighted: {
    color: config.styles.primaryColor,
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    header_container: {
      backgroundColor: config.styles.light.secondaryBackgroundColor,
      borderBottomColor: config.styles.light.primaryBorderColor,
    },

    header_text: {
      color: config.styles.light.secondaryTextColor,
    },

    empty_text: {
      color: config.styles.light.primaryTextColor,
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    header_container: {
      backgroundColor: config.styles.dark.secondaryBackgroundColor,
      borderBottomColor: config.styles.dark.primaryBorderColor,
    },

    header_text: {
      color: config.styles.dark.secondaryTextColor,
    },

    empty_text: {
      color: config.styles.dark.primaryTextColor,
    },
  }),
);

export const selectableImageLightStyles = (windowWidth: number): any =>
  StyleSheet.create(
    _.merge({}, defaultSelectableImageLightStyles, {
      image_container: {
        padding: imagePadding,
      },
      image: calculateImageDimension(windowWidth),
    }),
  );

export const selectableImageDarkStyles = (windowWidth: number): any =>
  StyleSheet.create(
    _.merge({}, defaultSelectableImageDarkStyles, {
      image_container: {
        padding: imagePadding,
      },
      image: calculateImageDimension(windowWidth),
    }),
  );

function calculateImageDimension(windowWidth: number): ViewStyle {
  const width =
    (windowWidth - imagePadding * 2 * (numColumns + 1)) / numColumns;

  return {
    width,
    height: width,
  };
}
