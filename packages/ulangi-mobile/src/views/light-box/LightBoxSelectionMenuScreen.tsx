/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ObservableLightBox,
  ObservableScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { NavigatorDelegate } from '../../delegates/navigator/NavigatorDelegate';
import { ls } from '../../utils/responsive';
import { Screen } from '../common/Screen';
import { LightBoxAnimatableView } from './LightBoxAnimatableView';
import { LightBoxSelectionMenu } from './LightBoxSelectionMenu';
import { LightBoxTouchableBackground } from './LightBoxTouchableBackground';

export interface LightBoxSelectionMenuScreenProps {
  themeStore: ObservableThemeStore;
  observableLightBox: ObservableLightBox;
  observableScreen: ObservableScreen;
  navigatorDelegate: NavigatorDelegate;
}

@observer
export class LightBoxSelectionMenuScreen extends React.Component<
  LightBoxSelectionMenuScreenProps
> {
  private close(): void {
    this.props.navigatorDelegate.dismissLightBox();
  }

  public componentWillUnmount(): void {
    if (
      this.props.observableLightBox.selectionMenu !== null &&
      typeof this.props.observableLightBox.selectionMenu.onClose !== 'undefined'
    ) {
      this.props.observableLightBox.selectionMenu.onClose();
    }
  }

  public render(): null | React.ReactElement<any> {
    if (this.props.observableLightBox.selectionMenu === null) {
      return null;
    } else {
      return (
        <Screen
          useSafeAreaView={false}
          observableScreen={this.props.observableScreen}
          style={styles.screen}>
          <LightBoxTouchableBackground
            observableLightBox={this.props.observableLightBox}
            observableScreen={this.props.observableScreen}
            style={styles.light_box_container}
            enabled={true}
            activeOpacity={0.2}
            onPress={(): void => this.close()}>
            <LightBoxAnimatableView
              style={styles.inner_container}
              observableLightBox={this.props.observableLightBox}>
              <LightBoxSelectionMenu
                theme={this.props.themeStore.theme}
                selectionMenu={this.props.observableLightBox.selectionMenu}
              />
            </LightBoxAnimatableView>
          </LightBoxTouchableBackground>
        </Screen>
      );
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  light_box_container: {
    justifyContent: 'center',
    paddingVertical: 150,
    paddingHorizontal: ls(16),
  },

  inner_container: {
    flexShrink: 1,
  },
});
