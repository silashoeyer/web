/**
 * Constants used for the UserDashboard module
 */

import udstrings from "../i18n/userDashboard";

const OPTIONS = {
  WEEK: udstrings.last7days,
  MONTH: udstrings.last30days,
  YEAR: udstrings.last12months,
  YEARS: udstrings.availableYears,
  CUSTOM_WEEK: udstrings.custom7DaysUntil,
  CUSTOM_MONTH: udstrings.custom30DaysUntil,
  CUSTOM_YEAR: udstrings.custom12MonthsUntil,
};

const ACTIVITY_TIME_FORMAT_OPTIONS = {
  MINUTES: udstrings.minutes,
  HOURS: udstrings.hours,
};

const TOP_TABS = {
  BAR_GRAPH: udstrings.tabActivity,
  LINE_GRAPH: udstrings.tabWords,
};

const USER_DASHBOARD_TITLES = {
  MAIN_TITLE: udstrings.userDashboardTitle,
  BAR_GRAPH_TEXT: udstrings.helperTextActivity,
  LINE_GRAPH_TEXT: udstrings.helperTextWords,
  TIME_COUNT_IN: udstrings.helperTextTimeCount,
};

const LINE_GRAPH_BOTTOM_LEGEND = {
  WEEK: udstrings.wordsGraphLegendWeek,
  MONTH: udstrings.wordsGraphLegendMonth,
  YEAR: udstrings.wordsGraphLegendYear,
  YEARS: udstrings.wordsGraphLegendYears,
};

const FEEDBACK = {
  BUTTON_TEXT: udstrings.feedbackButtonText,
  ALERT_TEXT: udstrings.feedbackAlertText,
};

/**
 * Below
 * Constants not translatable
 *
 */

// this cannot be made translatable
// if the keys are renamed, the graph will not be shown.
// Alternatively, there keys in the result array in ReadingAndExercisesDataFromat
// should change too
const BAR_GRAPH_KEYS = {
  READING: "reading_time",
  EXERCISES: "exercises_time",
  INDEX_BY: "date",
  LEGEND_BOTTOM: "date",
  LEGEND_LEFT: "",
};

const PERIOD_OPTIONS = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
  YEARS: "years",
};

const TABS_IDS = {
  BAR_GRAPH: 1,
  LINE_GRAPH: 2,
};

//date format used for making sure dates are translated
//in the same way when working with the data
//this is _not_ the date format used for formatting dates to be shown on the graphs or datepicker
const DATE_FORMAT = "yyyy-MM-dd";

const DATE_FORMAT_FOR_DATEPICKER = "dd/MM/yyyy";

export {
  PERIOD_OPTIONS,
  DATE_FORMAT,
  BAR_GRAPH_KEYS,
  ACTIVITY_TIME_FORMAT_OPTIONS,
  TOP_TABS,
  USER_DASHBOARD_TITLES,
  OPTIONS,
  LINE_GRAPH_BOTTOM_LEGEND,
  DATE_FORMAT_FOR_DATEPICKER,
  TABS_IDS,
  FEEDBACK,
};
