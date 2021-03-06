/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ObservableThemeStore,
  ObservableWritingScreen,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { WritingScreenIds } from '../../constants/ids/WritingScreenIds';
import { WritingScreenDelegate } from '../../delegates/writing/WritingScreenDelegate';
import { SelectedCategories } from '../category/SelectedCategories';
import { Screen } from '../common/Screen';
import { WritingMenu } from './WritingMenu';
import { WritingTitle } from './WritingTitle';

export interface WritingScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableWritingScreen;
  screenDelegate: WritingScreenDelegate;
}

@observer
export class WritingScreen extends React.Component<WritingScreenProps> {
  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={styles.screen}
        useSafeAreaView={false}
        testID={WritingScreenIds.SCREEN}
        observableScreen={this.props.observableScreen}>
        <View style={styles.container}>
          <View style={styles.middle_container}>
            <View style={styles.title_container}>
              <WritingTitle theme={this.props.themeStore.theme} />
            </View>
            <View style={styles.menu_container}>
              <WritingMenu
                screenLayout={this.props.observableScreen.screenLayout}
                startLesson={(): void =>
                  this.props.screenDelegate.startLesson(false)
                }
                showSettings={this.props.screenDelegate.showSettings}
                showFAQ={this.props.screenDelegate.showFAQ}
              />
            </View>
            <View style={styles.selected_categories_container}>
              <SelectedCategories
                selectedCategoryNames={
                  this.props.observableScreen.selectedCategoryNames
                }
                showSelectSpecificCategoryMessage={
                  this.props.screenDelegate.showSelectSpecificCategoryMessage
                }
                theme={this.props.themeStore.theme}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  middle_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title_container: {
    alignSelf: 'stretch',
    marginTop: -50,
  },

  menu_container: {
    alignSelf: 'stretch',
  },

  selected_categories_container: {
    marginTop: 50,
  },
});
