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
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Images } from '../../constants/Images';
import { AtomPausedScreenIds } from '../../constants/ids/AtomPausedScreenIds';
import { ls, ss } from '../../utils/responsive';
import { DefaultText } from '../common/DefaultText';
import { Screen } from '../common/Screen';
import { LightBoxAnimatableView } from '../light-box/LightBoxAnimatableView';
import { LightBoxTouchableBackground } from '../light-box/LightBoxTouchableBackground';

export interface AtomPausedScreenProps {
  observableLightBox: ObservableLightBox;
  observableScreen: ObservableScreen;
  restart: () => void;
  quit: () => void;
  close: () => void;
  onClose?: () => void;
}

@observer
export class AtomPausedScreen extends React.Component<AtomPausedScreenProps> {
  private close(): void {
    this.props.close();
    if (typeof this.props.onClose !== 'undefined') {
      this.props.onClose();
    }
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        useSafeAreaView={false}
        observableScreen={this.props.observableScreen}
        style={styles.screen}>
        <LightBoxTouchableBackground
          testID={AtomPausedScreenIds.SCREEN}
          observableLightBox={this.props.observableLightBox}
          observableScreen={this.props.observableScreen}
          style={styles.light_box_container}
          enabled={true}
          activeOpacity={0.2}
          onPress={(): void => this.close()}>
          <LightBoxAnimatableView
            testID={AtomPausedScreenIds.CONTAINER}
            observableLightBox={this.props.observableLightBox}>
            <View style={styles.inner_container}>
              <View style={styles.title_container}>
                <DefaultText style={styles.title_text}>PAUSED</DefaultText>
              </View>
              <View style={styles.content_container}>
                <TouchableOpacity
                  testID={AtomPausedScreenIds.QUIT_BTN}
                  style={styles.button_touchable}
                  onPress={this.props.quit}>
                  <Image source={Images.CROSS_GREY_40X40} />
                  <DefaultText style={styles.button_text}>Quit</DefaultText>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={AtomPausedScreenIds.RESTART_BTN}
                  style={styles.button_touchable}
                  onPress={this.props.restart}>
                  <Image source={Images.REFRESH_GREY_40X40} />
                  <DefaultText style={styles.button_text}>Restart</DefaultText>
                </TouchableOpacity>
              </View>
            </View>
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
  },

  inner_container: {
    alignSelf: 'stretch',
    marginHorizontal: ls(16),
    marginVertical: ss(16),
    borderRadius: ss(16),
    backgroundColor: '#f8f3d4',
    overflow: 'hidden',
  },

  title_container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ss(16),
    borderBottomColor: '#a6a28d',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#e3dec1',
  },

  title_text: {
    fontSize: ss(20),
    fontFamily: 'JosefinSans-Bold',
    textAlign: 'center',
    color: '#444',
  },

  content_container: {
    paddingVertical: ss(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button_touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button_text: {
    fontFamily: 'JosefinSans',
    color: '#444',
    fontSize: ss(18),
    paddingTop: ss(5),
  },
});
