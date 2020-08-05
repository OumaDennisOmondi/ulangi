/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ObservableQuizScreen,
  ObservableThemeStore,
} from '@ulangi/ulangi-observable';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { QuizScreenIds } from '../../constants/ids/QuizScreenIds';
import { QuizScreenDelegate } from '../../delegates/quiz/QuizScreenDelegate';
import { SelectedCategories } from '../category/SelectedCategories';
import { Screen } from '../common/Screen';
import { QuizMenu } from './QuizMenu';
import { QuizTitle } from './QuizTitle';

export interface QuizScreenProps {
  themeStore: ObservableThemeStore;
  observableScreen: ObservableQuizScreen;
  screenDelegate: QuizScreenDelegate;
}

export class QuizScreen extends React.Component<QuizScreenProps> {
  public render(): React.ReactElement<any> {
    return (
      <Screen
        style={styles.screen}
        testID={QuizScreenIds.SCREEN}
        useSafeAreaView={true}
        observableScreen={this.props.observableScreen}>
        <View style={styles.container}>
          <View style={styles.middle_container}>
            <View style={styles.title_container}>
              <QuizTitle theme={this.props.themeStore.theme} />
            </View>
            <View style={styles.menu_container}>
              <QuizMenu
                screenLayout={this.props.observableScreen.screenLayout}
                startWritingQuiz={this.props.screenDelegate.startWritingQuiz}
                startMultipleChoiceQuiz={
                  this.props.screenDelegate.startMultipleChoiceQuiz
                }
                showSettings={this.props.screenDelegate.showSettings}
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
