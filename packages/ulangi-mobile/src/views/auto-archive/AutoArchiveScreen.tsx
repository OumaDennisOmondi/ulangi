/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ButtonSize, Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableAutoArchiveScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';

import { AutoArchiveScreenIds } from '../../constants/ids/AutoArchiveScreenIds';
import { AutoArchiveScreenDelegate } from '../../delegates/auto-archive/AutoArchiveScreenDelegate';
import { FullRoundedButtonStyle } from '../../styles/FullRoundedButtonStyle';
import { DefaultButton } from '../common/DefaultButton';
import { Screen } from '../common/Screen';
import { SectionGroup } from '../section/SectionGroup';
import { SectionRow } from '../section/SectionRow';
import {
  AutoArchiveScreenStyles,
  darkStyles,
  lightStyles,
} from './AutoArchiveScreen.style';

export interface AutoArchiveScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableAutoArchiveScreen;
  screenDelegate: AutoArchiveScreenDelegate;
}

@observer
export class AutoArchiveScreen extends React.Component<AutoArchiveScreenProps> {
  public get styles(): AutoArchiveScreenStyles {
    return this.props.themeStore.theme === Theme.LIGHT
      ? lightStyles
      : darkStyles;
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={this.styles.screen}
        testID={AutoArchiveScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}>
        {this.renderToggleSection()}
        {this.renderConditionsSection()}
      </Screen>
    );
  }

  private renderToggleSection(): React.ReactElement<any> {
    return (
      <SectionGroup theme={this.props.themeStore.theme} key="toggle">
        <SectionRow
          theme={this.props.themeStore.theme}
          leftText="Auto Archive"
          customRight={
            <DefaultButton
              testID={AutoArchiveScreenIds.AUTO_ARCHIVE_TOGGLE_BTN}
              text={
                this.props.observableScreen.autoArchiveSettings
                  .autoArchiveEnabled === true
                  ? 'On'
                  : 'Off'
              }
              styles={FullRoundedButtonStyle.getPrimaryOutlineStyles(
                ButtonSize.SMALL,
              )}
              onPress={(): void => {
                this.props.observableScreen.autoArchiveSettings.autoArchiveEnabled = !this
                  .props.observableScreen.autoArchiveSettings
                  .autoArchiveEnabled;
              }}
            />
          }
          description="Automatically archive terms that meet all the below conditions."
        />
      </SectionGroup>
    );
  }

  private renderConditionsSection(): React.ReactElement<any> {
    return (
      <SectionGroup
        theme={this.props.themeStore.theme}
        key="conditions"
        header="CONDITIONS">
        <SectionRow
          theme={this.props.themeStore.theme}
          leftText="When Spaced Repetition Level (SR) is at or above"
          customRight={
            <DefaultButton
              testID={AutoArchiveScreenIds.SHOW_SELECT_SR_LEVEL_MENU_BTN}
              text={
                'Level ' +
                this.props.observableScreen.autoArchiveSettings
                  .spacedRepetitionLevelThreshold
              }
              styles={FullRoundedButtonStyle.getPrimaryOutlineStyles(
                ButtonSize.SMALL,
              )}
              onPress={(): void => {
                this.props.screenDelegate.showLevelMenuForSpacedRepetition();
              }}
            />
          }
          shrink="left"
          disabled={
            !this.props.observableScreen.autoArchiveSettings.autoArchiveEnabled
          }
        />
        <SectionRow
          theme={this.props.themeStore.theme}
          leftText="When Writing Level (WR) is at or above"
          customRight={
            <DefaultButton
              testID={AutoArchiveScreenIds.SHOW_SELECT_WR_LEVEL_MENU_BTN}
              text={
                'Level ' +
                this.props.observableScreen.autoArchiveSettings
                  .writingLevelThreshold
              }
              styles={FullRoundedButtonStyle.getPrimaryOutlineStyles(
                ButtonSize.SMALL,
              )}
              onPress={(): void => {
                this.props.screenDelegate.showLevelMenuForWriting();
              }}
            />
          }
          shrink="left"
          disabled={
            !this.props.observableScreen.autoArchiveSettings.autoArchiveEnabled
          }
        />
      </SectionGroup>
    );
  }
}
