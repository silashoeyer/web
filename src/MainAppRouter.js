import { Route, Switch } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import ExtensionInstalled from "./pages/onboarding/ExtensionInstalled";
import InstallExtension from "./pages/onboarding/InstallExtension";
import SelectInterests from "./pages/onboarding/SelectInterests";
import ExcludeWords from "./pages/onboarding/ExcludeWords";
import ResetPassword from "./pages/ResetPassword";
import NoSidebarRouter from "./NoSidebarRouter";
import LogIn from "./pages/LogIn";
import CreateAccount from "./pages/onboarding/CreateAccount";
import LanguagePreferences from "./pages/onboarding/LanguagePreferences";
import ArticlesRouter from "./articles/_ArticlesRouter";
import NotFound from "./pages/NotFound";
import ExercisesRouter from "./exercises/ExercisesRouter";
import WordsRouter from "./words/_WordsRouter";
import ReadingHistory from "./words/WordHistory";
import TeacherRouter from "./teacher/_routing/_TeacherRouter";
import ArticleReader from "./reader/ArticleReader";
import UserDashboard from "./userDashboard/UserDashboard";
import { PrivateRouteWithMainNav } from "./PrivateRouteWithMainNav";
import { PrivateRoute } from "./PrivateRoute";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";
import SettingsRouter from "./pages/Settings/_SettingsRouter";
import ExercisesForArticle from "./exercises/ExercisesForArticle";
import { UMR_SOURCE } from "./reader/ArticleReader";
import VideoPage from "./videos/VideoPage";

export default function MainAppRouter({
  api,
  setUser,
  hasExtension,
  handleSuccessfulLogIn,
}) {
  return (
    <Switch>
      <Route
        path="/log_in"
        render={() => (
          <LogIn api={api} handleSuccessfulLogIn={handleSuccessfulLogIn} />
        )}
      />

      <Route
        path="/account_details"
        render={() => (
          <CreateAccount
            api={api}
            handleSuccessfulLogIn={handleSuccessfulLogIn}
            setUser={setUser}
          />
        )}
      />

      <Route
        path="/create_account"
        render={() => <LanguagePreferences api={api} />}
      />

      <Route
        path="/language_preferences"
        render={() => <LanguagePreferences api={api} />}
      />

      <Route path="/" exact render={() => <LandingPage />} />
      <Route
        path="/extension_installed"
        render={() => <ExtensionInstalled api={api} />}
      />
      <Route path="/install_extension" render={() => <InstallExtension />} />
      <Route path="/reset_pass" render={() => <ResetPassword api={api} />} />
      <Route path="/render" render={() => <NoSidebarRouter api={api} />} />

      <PrivateRoute
        path="/account_deletion"
        api={api}
        component={DeleteAccount}
      />

      <PrivateRoute
        path="/select_interests"
        api={api}
        hasExtension={hasExtension}
        component={SelectInterests}
      />

      <PrivateRoute
        path="/exclude_words"
        api={api}
        hasExtension={hasExtension}
        component={ExcludeWords}
      />

      <PrivateRouteWithMainNav
        path="/articles"
        api={api}
        component={ArticlesRouter}
      />

      <PrivateRouteWithMainNav
        path="/videos"
        api={api}
        component={VideoPage}
      />

      <PrivateRouteWithMainNav
        path="/exercises"
        api={api}
        component={ExercisesRouter}
      />
      <PrivateRouteWithMainNav
        path="/words"
        api={api}
        component={WordsRouter}
      />
      <PrivateRouteWithMainNav
        path="/history"
        api={api}
        component={ReadingHistory}
      />
      <PrivateRouteWithMainNav
        path="/account_settings"
        api={api}
        setUser={setUser}
        component={SettingsRouter}
      />
      <PrivateRouteWithMainNav
        path="/teacher"
        api={api}
        component={TeacherRouter}
      />
      <PrivateRouteWithMainNav
        path="/read/article"
        api={api}
        component={ArticleReader}
      />
      <PrivateRouteWithMainNav
        path="/user_dashboard"
        api={api}
        component={UserDashboard}
      />
      <PrivateRouteWithMainNav
        path="/search"
        api={api}
        component={ArticlesRouter}
      />
      <PrivateRouteWithMainNav
        path="/articleWordReview/:articleID"
        api={api}
        component={ExercisesForArticle}
        source={UMR_SOURCE}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
