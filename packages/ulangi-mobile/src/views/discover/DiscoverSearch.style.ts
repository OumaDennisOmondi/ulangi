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

export interface DiscoverSearchStyles {
  search_container: ViewStyle;

  search_icon: ImageStyle;

  remove_icon: ImageStyle;

  search_input: TextStyle;
}

const baseStyles: DiscoverSearchStyles = {
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ss(16),
    marginVertical: ss(12),
    paddingHorizontal: ss(13),
    borderRadius: ss(5),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0.3 },
    shadowRadius: 0.75,
    shadowOpacity: 0.25,
    elevation: 0.75,
  },

  search_icon: {
    marginRight: ss(3),
  },

  remove_icon: {
    marginLeft: ss(3),
  },

  search_input: {
    flex: 1,
    fontSize: ss(15),
    padding: ss(0),
    height: ss(40),
  },
};

export const lightStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    search_container: {
      backgroundColor: config.styles.light.primaryBackgroundColor,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 0.3 },
      shadowRadius: 0.75,
      shadowOpacity: 0.25,
      elevation: 0.75,
    },

    search_input: {
      color: '#545454',
    },
  }),
);

export const darkStyles = StyleSheet.create(
  _.merge({}, baseStyles, {
    search_container: {
      backgroundColor: config.styles.dark.primaryBackgroundColor,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 0.5 },
      shadowRadius: 0.75,
      shadowOpacity: 0.25,
      elevation: 3,
    },

    search_input: {
      color: '#ddd',
    },
  }),
);
