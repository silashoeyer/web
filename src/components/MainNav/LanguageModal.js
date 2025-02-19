import { useState, useEffect, useContext } from "react";
import { APIContext } from "../../contexts/APIContext.js";
import { UserContext } from "../../contexts/UserContext.js";
import { saveUserInfoIntoCookies } from "../../utils/cookies/userInfo.js";
import { Link } from "react-router-dom";
import LocalStorage from "../../assorted/LocalStorage.js";
import Modal from "../modal_shared/Modal.js";
import Form from "../../pages/_pages_shared/Form.sc.js";
import ButtonContainer from "../modal_shared/ButtonContainer.sc.js";
import Button from "../../pages/_pages_shared/Button.sc.js";
import FormSection from "../../pages/_pages_shared/FormSection.sc.js";
import Main from "../modal_shared/Main.sc.js";
import Header from "../modal_shared/Header.sc.js";
import Heading from "../modal_shared/Heading.sc.js";
import RadioGroup from "./RadioGroup.js";

export default function LanguageModal({ open, setOpen, setUser }) {
  const api = useContext(APIContext);
  const user = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState(undefined);
  const [currentLearnedLanguage, setCurrentLearnedLanguage] =
    useState(undefined);
  const [activeLanguages, setActiveLanguages] = useState(undefined);
  const [CEFR, setCEFR] = useState("");

  function setCEFRlevel(data) {
    const levelKey = data.learned_language + "_cefr_level";
    const levelNumber = data[levelKey];
    setCEFR("" + levelNumber);
    setUserDetails({
      ...data,
      cefr_level: levelNumber,
    });
  }

  useEffect(() => {
    if (open) {
      api.getUserLanguages((data) => {
        setActiveLanguages(data);
      });

      api.getUserDetails((data) => {
        setUserDetails(data);
        setCEFRlevel(data); //the api won't update without it (bug to fix)
        setCurrentLearnedLanguage(data.learned_language);
      });
    }
    return () => {
      setActiveLanguages(undefined);
      setUserDetails(undefined);
      setCurrentLearnedLanguage(undefined);
    };
  }, [open, api, user.session]);

  function updateLearnedLanguage(lang_code) {
    setCurrentLearnedLanguage(lang_code);
    const newUserDetails = {
      ...userDetails,
      learned_language: lang_code,
      cefr_level: CEFR,
    };
    setUserDetails(newUserDetails);
  }

  function updateUserInfo(info) {
    LocalStorage.setUserInfo(info);
    setUser({
      ...user,
      learned_language: info.learned_language,
      cefr_level: CEFR,
    });

    saveUserInfoIntoCookies(info);
  }

  function handleSave(e) {
    e.preventDefault();
    api.saveUserDetails(userDetails, setErrorMessage, () => {
      updateUserInfo(userDetails);
      window.location.reload();
      setOpen(false);
    });
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Header withoutLogo>
        <Heading>Your Active Languages:</Heading>
      </Header>
      <Main>
        <Form>
          <FormSection>
            <RadioGroup
              radioGroupLabel="Choose your current language:"
              name="active-language"
              options={activeLanguages}
              selectedValue={currentLearnedLanguage}
              onChange={(e) => {
                updateLearnedLanguage(e.target.value);
              }}
              optionLabel={(e) => e.language}
              optionValue={(e) => e.code}
              optionId={(e) => e.id}
            />
          </FormSection>
          <ButtonContainer className={"adaptive-alignment-horizontal"}>
            <Button onClick={handleSave} type={"submit"}>
              Save
            </Button>
            <Link
              onClick={() => setOpen(false)}
              to="/account_settings/language_settings"
            >
              Add a new language
            </Link>
          </ButtonContainer>
        </Form>
      </Main>
    </Modal>
  );
}
