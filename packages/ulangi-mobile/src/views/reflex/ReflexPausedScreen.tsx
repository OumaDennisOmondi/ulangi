/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ObservableLightBox,
  ObservableScreen,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { ReflexPausedScreenIds } from '../../constants/ids/ReflexPausedScreenIds';
import { ReflexStyle } from '../../styles/ReflexStyle';
import { ss } from '../../utils/responsive';
import { DefaultButton } from '../common/DefaultButton';
import { DefaultText } from '../common/DefaultText';
import { Screen } from '../common/Screen';
import { LightBoxAnimatableView } from '../light-box/LightBoxAnimatableView';
import { LightBoxTouchableBackground } from '../light-box/LightBoxTouchableBackground';

export interface ReflexPausedScreenProps {
  observableLightBox: ObservableLightBox;
  observableScreen: ObservableScreen;
  continue: () => void;
  restart: () => void;
  quit: () => void;
}

@observer
export class ReflexPausedScreen extends React.Component<
  ReflexPausedScreenProps
> {
  public render(): React.ReactElement<any> {
    return (
      <Screen
        useSafeAreaView={false}
        observableScreen={this.props.observableScreen}
        style={styles.screen}>
        <LightBoxTouchableBackground
          testID={ReflexPausedScreenIds.SCREEN}
          observableLightBox={this.props.observableLightBox}
          observableScreen={this.props.observableScreen}
          enabled={true}
          activeOpacity={0.2}
          style={styles.light_box_container}
          onPress={(): void => this.props.continue()}>
          <LightBoxAnimatableView
            testID={ReflexPausedScreenIds.CONTAINER}
            observableLightBox={this.props.observableLightBox}
            style={styles.inner_container}>
            <View style={styles.title_container}>
              <DefaultText style={styles.title}>Paused</DefaultText>
            </View>
            <DefaultButton
              testID={ReflexPausedScreenIds.CONTINUE_BTN}
              text="Continue"
              styles={ReflexStyle.getMenuButtonStyles()}
              onPress={this.props.continue}
            />
            <DefaultButton
              testID={ReflexPausedScreenIds.RESTART_BTN}
              text="Restart"
              styles={ReflexStyle.getMenuButtonStyles()}
              onPress={this.props.restart}
            />
            <DefaultButton
              testID={ReflexPausedScreenIds.QUIT_BTN}
              text="Quit"
              styles={ReflexStyle.getMenuButtonStyles()}
              onPress={this.props.quit}
            />
            <View style={styles.spacer} />
          </LightBoxAnimatableView>
        </LightBoxTouchableBackground>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  light_box_container: {
    justifyContent: 'center',
    paddingHorizontal: ss(16),
  },

  inner_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ss(8),
  },

  title: {
    fontSize: ss(34),
    fontFamily: 'Raleway-Black',
    color: '#fff',
  },

  spacer: {
    height: ss(30),
  },
});
