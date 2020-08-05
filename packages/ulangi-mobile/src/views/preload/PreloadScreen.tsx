/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ObservablePreloadScreen } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { PreloadScreenIds } from '../../constants/ids/PreloadScreenIds';
import { DefaultText } from '../common/DefaultText';
import { Screen } from '../common/Screen';

export interface PreloadScreenProps {
  observableScreen: ObservablePreloadScreen;
  shouldRenderMessage: boolean;
}

@observer
export class PreloadScreen extends React.Component<PreloadScreenProps> {
  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={styles.screen}
        testID={PreloadScreenIds.SCREEN}
        useSafeAreaView={true}
        observableScreen={this.props.observableScreen}>
        <ActivityIndicator color="white" />
        <DefaultText style={styles.message}>
          {this.props.shouldRenderMessage === true
            ? this.props.observableScreen.message
            : ''}
        </DefaultText>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',
  },
});
