import { useEffect } from "react";
import strings from "../i18n/definitions";
import News from "./News";
import * as s from "./LandingPage.sc.js";
import Contributors from "./Contributors";
import { Redirect } from "react-router-dom";
import { setTitle } from "../assorted/setTitle";
import { getSessionFromCookies } from "../utils/cookies/userInfo";
import Button from "../pages/_pages_shared/Button.sc";
import RoundedForwardArrow from "@mui/icons-material/ArrowForwardRounded";

import redirect from "../utils/routing/routing.js";
import { Link } from "react-router-dom/cjs/react-router-dom.js";

export default function LandingPage() {
  useEffect(() => {
    setTitle(strings.landingPageTitle);
  }, []);

  if (getSessionFromCookies()) {
    return <Redirect to={{ pathname: "/articles" }} />;
  }

  return (
    <s.PageWrapper>
      <s.NavbarBg>
        <s.Navbar>
          <s.LogoWithText>
            <s.ZeeguuLogo
              src="/static/images/zeeguuWhiteLogo.svg"
              alt="elephant logo"
            />
            Zeeguu
          </s.LogoWithText>
          <s.NavbarButtonContainer>
            <Link to={"/log_in"}>
              <s.WhiteOutlinedNavbarBtn>
                {strings.login}
              </s.WhiteOutlinedNavbarBtn>
            </Link>
            <Link to={"/language_preferences"}>
              <s.WhiteFilledNavbarBtn>
                {strings.register}
              </s.WhiteFilledNavbarBtn>
            </Link>
          </s.NavbarButtonContainer>

          {/* temporarily disable UI language settings */}
          {/* <UiLanguageSettings
          uiLanguage={uiLanguage}
          setUiLanguage={setUiLanguage}
        /> */}
        </s.Navbar>
      </s.NavbarBg>

      <s.PageContent>
        <s.HeroColumn>
          <h1>Learn foreign languages while reading what you&nbsp;like</h1>
          <p className="hero-paragraph">
            {strings.projectDescription_UltraShort}
          </p>
          <Link to={"/language_preferences"}>
            <Button>
              {strings.getStarted}
              <RoundedForwardArrow />
            </Button>
          </Link>
        </s.HeroColumn>

        <s.PaleAdaptableColumn>
          <h1>{strings.howDoesItWork}</h1>
          <h2>{strings.personalizedReading}</h2>
          <s.DescriptionText>
            <p>{strings.personalizedRecommandationsEllaboration1}</p>

            <p>{strings.personalizedRecommandationsEllaboration2}</p>
          </s.DescriptionText>

          <h2>{strings.easyTranslations}</h2>
          <s.DescriptionText>
            <p>{strings.easyTranslationsEllaboration1}</p>

            <p>{strings.easyTranslationsEllaboration2}</p>

            <p>{strings.easyTranslationsEllaboration3}</p>
          </s.DescriptionText>

          <h2>{strings.personalizedExercises}</h2>
          <s.DescriptionText>
            <p>{strings.personalizedPractiseEllaboration1}</p>

            <p>{strings.personalizedMultipleExerciseTypes}</p>

            <p>{strings.personalizedPractiseEllaboration2}</p>
          </s.DescriptionText>
        </s.PaleAdaptableColumn>

        <s.AdaptableColumn>
          <News />
        </s.AdaptableColumn>

        <s.PaleAdaptableColumn>
          <Contributors />
        </s.PaleAdaptableColumn>
      </s.PageContent>
    </s.PageWrapper>
  );
}
