import { ButtonSize, Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableEventStore,
  ObservableScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';

import { config } from '../../constants/config';
import { EventLogsScreenIds } from '../../constants/ids/EventLogsScreenIds';
import { EventLogsScreenDelegate } from '../../delegates/event/EventLogsScreenDelegate';
import { RoundedCornerButtonStyle } from '../../styles/RoundedCornerButtonStyle';
import { DefaultButton } from '../common/DefaultButton';
import { DefaultText } from '../common/DefaultText';
import { Screen } from '../common/Screen';
import {
  EventLogsScreenStyles,
  darkStyles,
  lightStyles,
} from './EventLogsScreen.style';

export interface EventLogsScreenProps {
  themeStore: ObservableThemeStore;
  eventStore: ObservableEventStore;
  observableScreen: ObservableScreen;
  screenDelegate: EventLogsScreenDelegate;
}

@observer
export class EventLogsScreen extends React.Component<EventLogsScreenProps> {
  public get styles(): EventLogsScreenStyles {
    return this.props.themeStore.theme === Theme.LIGHT
      ? lightStyles
      : darkStyles;
  }

  public render(): React.ReactElement<any> {
    return (
      <Screen
        testID={EventLogsScreenIds.SCREEN}
        style={this.styles.screen}
        observableScreen={this.props.observableScreen}
        useSafeAreaView={true}>
        <View style={this.styles.paragraph}>
          <DefaultText style={this.styles.text}>
            The event logs are useful for debugging only. Currently, there are{' '}
            {this.props.eventStore.eventList.length} most recent events in the
            logs.
          </DefaultText>
        </View>
        <View style={this.styles.paragraph}>
          <DefaultText style={this.styles.text}>
            Please only send them to us if requested.
          </DefaultText>
        </View>
        <View style={this.styles.button_container}>
          <DefaultButton
            text="Send to Developers"
            styles={RoundedCornerButtonStyle.getFullBackgroundStyles(
              ButtonSize.LARGE,
              3,
              config.styles.primaryColor,
              '#fff',
            )}
            onPress={this.props.screenDelegate.sendLogsToDevelopers}
          />
        </View>
      </Screen>
    );
  }
}
