/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ObservableScreen } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { env } from '../../constants/env';
import { WhatsNewScreenIds } from '../../constants/ids/WhatsNewScreenIds';
import { Screen } from '../common/Screen';

export interface WhatsNewScreenProps {
  observableScreen: ObservableScreen;
}

@observer
export class WhatsNewScreen extends React.Component<WhatsNewScreenProps> {
  private renderLoading(): React.ReactElement<any> {
    return <ActivityIndicator style={styles.spinner} size="small" />;
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={styles.screen}
        testID={WhatsNewScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}>
        <WebView
          source={{ uri: env.SERVER_URL + '/whats-new' }}
          renderLoading={this.renderLoading}
          startInLoadingState={true}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  spinner: {
    marginVertical: 16,
  },
});
