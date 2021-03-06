/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableGoogleSheetsAddOnScreen,
  ObservableThemeStore,
  ObservableUserStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';
import { View } from 'react-native';

import { config } from '../../constants/config';
import { GoogleSheetsAddOnScreenIds } from '../../constants/ids/GoogleSheetsAddOnScreenIds';
import { GoogleSheetsAddOnScreenDelegate } from '../../delegates/google-sheets/GoogleSheetsAddOnScreenDelegate';
import { DefaultText } from '../common/DefaultText';
import { DefaultTextInput } from '../common/DefaultTextInput';
import { Screen } from '../common/Screen';
import { SmartScrollView } from '../common/SmartScrollView';
import { SectionGroup } from '../section/SectionGroup';
import { SectionRow } from '../section/SectionRow';
import {
  GoogleSheetsAddOnScreenStyles,
  darkStyles,
  lightStyles,
} from './GoogleSheetsAddOnScreen.style';

export interface GoogleSheetsAddOnScreenProps {
  observableScreen: ObservableGoogleSheetsAddOnScreen;
  themeStore: ObservableThemeStore;
  userStore: ObservableUserStore;
  screenDelegate: GoogleSheetsAddOnScreenDelegate;
}

@observer
export class GoogleSheetsAddOnScreen extends React.Component<
  GoogleSheetsAddOnScreenProps
> {
  public get styles(): GoogleSheetsAddOnScreenStyles {
    return this.props.themeStore.theme === Theme.LIGHT
      ? lightStyles
      : darkStyles;
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={this.styles.screen}
        testID={GoogleSheetsAddOnScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}>
        <SmartScrollView>
          <View style={this.styles.intro_container}>
            <DefaultText style={this.styles.intro_text}>
              We developed a Google Sheets add-on so that you can directly
              import/export your data from a Google Sheets document.
            </DefaultText>
          </View>
          <View style={this.styles.section_container}>
            <SectionGroup
              theme={this.props.themeStore.theme}
              header="TUTORIALS">
              <SectionRow
                theme={this.props.themeStore.theme}
                leftText="How to install the add-on"
                showArrow={true}
                onPress={(): void =>
                  this.props.screenDelegate.goToLink(
                    config.links.ulangiSheetsAddOn.installTutorial,
                  )
                }
              />
              <SectionRow
                theme={this.props.themeStore.theme}
                leftText="How to use the add-on"
                showArrow={true}
                onPress={(): void =>
                  this.props.screenDelegate.goToLink(
                    config.links.ulangiSheetsAddOn.useTutorial,
                  )
                }
              />
            </SectionGroup>
            <SectionGroup
              theme={this.props.themeStore.theme}
              header="API KEY FOR GOOGLE SHEETS">
              {typeof this.props.observableScreen.apiKey === 'undefined'
                ? this.renderPasswordInput()
                : this.renderApiKey()}
            </SectionGroup>
          </View>
        </SmartScrollView>
      </Screen>
    );
  }

  private renderPasswordInput(): React.ReactElement<any> {
    if (
      this.props.userStore.existingCurrentUser.email.endsWith(
        config.general.guestEmailDomain,
      )
    ) {
      return (
        <SectionRow
          theme={this.props.themeStore.theme}
          leftText="To get API key, please set up the Ulangi account first."
        />
      );
    } else {
      return (
        <SectionRow
          theme={this.props.themeStore.theme}
          customLeft={
            <DefaultTextInput
              style={this.styles.password_input}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Enter password here to show API key"
              onChangeText={(text): void => {
                this.props.observableScreen.password = text;
              }}
              onSubmitEditing={this.props.screenDelegate.getApiKey}
              placeholderTextColor={
                this.props.themeStore.theme === Theme.LIGHT
                  ? config.styles.light.secondaryTextColor
                  : config.styles.dark.secondaryTextColor
              }
            />
          }
        />
      );
    }
  }

  private renderApiKey(): React.ReactElement<any> {
    return (
      <SectionRow
        theme={this.props.themeStore.theme}
        customLeft={
          <DefaultText style={this.styles.api_key} selectable={true}>
            {this.props.observableScreen.apiKey}
          </DefaultText>
        }
        description={this.renderDescription()}
      />
    );
  }

  private renderDescription(): React.ReactElement<any> {
    return (
      <View>
        {typeof this.props.observableScreen.expiredAt !== 'undefined' &&
        this.props.observableScreen.expiredAt !== null ? (
          <DefaultText style={this.styles.expired_text}>
            {`Expired at ${moment(this.props.observableScreen.expiredAt).format(
              'MMM Do YYYY',
            )}`}
          </DefaultText>
        ) : null}
        <View style={this.styles.action_container}>
          <DefaultText
            style={this.styles.primary_text}
            onPress={this.props.screenDelegate.copyApiKeyToClipboard}>
            Copy
          </DefaultText>
          <DefaultText style={this.styles.dot}>{'\u00B7'}</DefaultText>
          <DefaultText
            style={this.styles.primary_text}
            onPress={this.props.screenDelegate.sendToEmail}>
            Send to email
          </DefaultText>
          <DefaultText style={this.styles.dot}>{'\u00B7'}</DefaultText>
          <DefaultText
            style={this.styles.invalidate_text}
            onPress={
              this.props.screenDelegate.showInvalidateApiKeyConfirmation
            }>
            Invalidate
          </DefaultText>
        </View>
      </View>
    );
  }
}
