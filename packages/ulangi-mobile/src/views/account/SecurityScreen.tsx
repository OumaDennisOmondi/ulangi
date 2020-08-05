/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ObservableScreen,
  ObservableThemeStore,
  ObservableUserStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { SecurityScreenIds } from '../../constants/ids/SecurityScreenIds';
import { SecurityScreenDelegate } from '../../delegates/account/SecurityScreenDelegate';
import { Screen } from '../common/Screen';
import { SectionGroup } from '../section/SectionGroup';
import { SectionRow } from '../section/SectionRow';

export interface SecurityScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableScreen;
  userStore: ObservableUserStore;
  screenDelegate: SecurityScreenDelegate;
}

@observer
export class SecurityScreen extends React.Component<SecurityScreenProps> {
  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={styles.screen}
        testID={SecurityScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}>
        <View style={styles.section_list}>{this.renderSections()}</View>
      </Screen>
    );
  }

  private renderSections(): readonly React.ReactElement<any>[] {
    return [this.renderAccountSection()];
  }

  private renderAccountSection(): React.ReactElement<any> {
    return (
      <SectionGroup
        theme={this.props.themeStore.theme}
        key="ulangi-account"
        header="ULANGI ACCOUNT">
        <SectionRow
          testID={SecurityScreenIds.CHANGE_EMAIL_BTN}
          theme={this.props.themeStore.theme}
          key="change-email"
          leftText="Change Email"
          rightText={this.props.userStore.existingCurrentUser.email}
          showArrow={true}
          shrink="right"
          onPress={this.props.screenDelegate.navigateToChangeEmailScreen}
        />
        <SectionRow
          testID={SecurityScreenIds.CHANGE_PASSWORD_BTN}
          theme={this.props.themeStore.theme}
          key="change-password"
          leftText="Change Password"
          rightText=""
          showArrow={true}
          onPress={this.props.screenDelegate.navigateToChangePasswordScreen}
        />
      </SectionGroup>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  section_list: {
    flex: 1,
    marginTop: 22,
  },
});
