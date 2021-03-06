/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Options } from '@ulangi/react-native-navigation';
import { ScreenName, Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableScreen,
  ObservableTitleTopBar,
  ObservableTopBarButton,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Container, ContainerPassedProps } from '../../Container';
import { Images } from '../../constants/Images';
import { PrivacyPolicyScreenIds } from '../../constants/ids/PrivacyPolicyScreenIds';
import { PrivacyPolicyScreenFactory } from '../../factories/about/PrivacyPolicyScreenFactory';
import { PrivacyPolicyScreen } from './PrivacyPolicyScreen';
import { PrivacyPolicyScreenStyle } from './PrivacyPolicyScreenContainer.style';

@observer
export class PrivacyPolicyScreenContainer extends Container {
  public static options(props: ContainerPassedProps): Options {
    return props.theme === Theme.LIGHT
      ? PrivacyPolicyScreenStyle.SCREEN_FULL_LIGHT_STYLES
      : PrivacyPolicyScreenStyle.SCREEN_FULL_DARK_STYLES;
  }

  protected observableScreen = new ObservableScreen(
    this.props.componentId,
    ScreenName.PRIVACY_POLICY_SCREEN,
    new ObservableTitleTopBar(
      'Privacy Policy',
      new ObservableTopBarButton(
        PrivacyPolicyScreenIds.BACK_BTN,
        null,
        {
          light: Images.ARROW_LEFT_BLACK_22X22,
          dark: Images.ARROW_LEFT_MILK_22X22,
        },
        (): void => {
          this.navigatorDelegate.dismissScreen();
        },
      ),
      null,
    ),
  );

  private screenFactory = new PrivacyPolicyScreenFactory(
    this.props,
    this.eventBus,
    this.observer,
  );

  private navigatorDelegate = this.screenFactory.createNavigatorDelegate();

  protected onThemeChanged(theme: Theme): void {
    this.navigatorDelegate.mergeOptions(
      theme === Theme.LIGHT
        ? PrivacyPolicyScreenStyle.SCREEN_LIGHT_STYLES_ONLY
        : PrivacyPolicyScreenStyle.SCREEN_DARK_STYLES_ONLY,
    );
  }

  public render(): React.ReactElement<any> {
    return <PrivacyPolicyScreen observableScreen={this.observableScreen} />;
  }
}
