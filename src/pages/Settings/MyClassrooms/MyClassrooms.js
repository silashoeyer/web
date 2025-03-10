import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Button from "../../_pages_shared/Button.sc";
import ButtonContainer from "../../_pages_shared/ButtonContainer.sc";
import InputField from "../../../components/InputField";
import Form from "../../_pages_shared/Form.sc";
import FormSection from "../../_pages_shared/FormSection.sc";
import PreferencesPage from "../../_pages_shared/PreferencesPage";
import Header from "../../_pages_shared/Header";
import Heading from "../../_pages_shared/Heading.sc";
import Main from "../../_pages_shared/Main.sc";
import FullWidthListContainer from "../../../components/FullWidthListContainer.sc";
import FullWidthErrorMsg from "../../../components/FullWidthErrorMsg.sc";
import BackArrow from "../settings_pages_shared/BackArrow";
import strings from "../../../i18n/definitions";
import LoadingAnimation from "../../../components/LoadingAnimation";
import FullWidthListItem from "../../../components/FullWidthListItem";
import LeaveClassroomModal from "./LeaveClassroomModal";
import useFormField from "../../../hooks/useFormField";
import { NonEmptyValidator } from "../../../utils/ValidatorRule/Validator";
import { setTitle } from "../../../assorted/setTitle";
import { APIContext } from "../../../contexts/APIContext";

export default function MyClassrooms() {
  const api = useContext(APIContext);
  const { session } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [
    inviteCode,
    setInviteCode,
    validateInviteCode,
    isInviteCodeValid,
    inviteCodeErrorMsg,
  ] = useFormField("", NonEmptyValidator("Please provide an invite code."));
  const [showJoinCohortError, setShowJoinCohortError] = useState(false);
  const [studentCohorts, setStudentCohorts] = useState([]);
  const [isLeaveClassroomModalOpen, setIsLeaveClassroomModalOpen] =
    useState(false);
  const [currentClassroom, setCurrentClassroom] = useState("");

  function updateValues() {
    setIsLoading(true);
    api.getStudent((student) => {
      setStudentCohorts(student.cohorts);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    setTitle(strings.myClassrooms);
  }, []);

  useEffect(() => {
    updateValues();
    // eslint-disable-next-line
  }, [session, api]);

  function handleOpenLeaveClassroomModal(classroom) {
    setCurrentClassroom(classroom);
    setIsLeaveClassroomModalOpen(true);
  }

  function handleCloseLeaveClassroomModal() {
    setIsLeaveClassroomModalOpen(false);
  }

  function handleInviteCodeChange(event) {
    setInviteCode(event.target.value);
  }

  function leaveClassroom(e, cohort) {
    e.preventDefault();
    api.leaveCohort(
      cohort.id,
      (status) => {
        if (status === "OK") {
          updateValues();
          setShowJoinCohortError(false); //clear error message after successfully leaving the classroom
        } else {
          setShowJoinCohortError(true);
        }
      },
      (error) => {
        setShowJoinCohortError(true);
        updateValues();
        console.log(error);
      },
    );
  }

  function saveStudentToClassroom(e) {
    e.preventDefault(e);
    setShowJoinCohortError(false);
    if (!validateInviteCode()) return;
    api.joinCohort(
      inviteCode.trim(),
      (status) => {
        if (status === "OK") {
          updateValues();
          setInviteCode("");
        } else {
          setShowJoinCohortError(true);
        }
      },
      (error) => {
        setShowJoinCohortError(true);
        updateValues();
        console.log(error);
      },
    );
  }

  if (isLoading) return <LoadingAnimation></LoadingAnimation>;

  const studentIsInCohort = studentCohorts && studentCohorts.length > 0;

  return (
    <PreferencesPage layoutVariant={"minimalistic-top-aligned"}>
      <BackArrow />
      <Header withoutLogo>
        <Heading>{strings.myClassrooms}</Heading>
      </Header>
      <Main>
        <FullWidthListContainer>
          {studentIsInCohort ? (
            studentCohorts.map((classroom, idx) => (
              <FullWidthListItem
                key={classroom.id}
                hasDeleteButton={true}
                onButtonClick={() => handleOpenLeaveClassroomModal(classroom)}
              >{`${idx + 1}. ${classroom.name}`}</FullWidthListItem>
            ))
          ) : (
            <FullWidthListItem>
              {"Currently, you are not enrolled in any class"}
            </FullWidthListItem>
          )}
          {isLeaveClassroomModalOpen && (
            <LeaveClassroomModal
              leaveClassroom={leaveClassroom}
              currentClassroom={currentClassroom}
              isLeaveClassroomModalOpen={isLeaveClassroomModalOpen}
              handleCloseLeaveClassroomModal={handleCloseLeaveClassroomModal}
            />
          )}
        </FullWidthListContainer>
        <Form>
          <FormSection>
            <InputField
              type={"text"}
              label={
                studentIsInCohort
                  ? strings.insertNewInviteCode
                  : strings.insertInviteCode
              }
              id={"cohort"}
              name={"cohort"}
              value={inviteCode}
              onChange={(event) => handleInviteCodeChange(event)}
              isError={!isInviteCodeValid || showJoinCohortError}
              errorMessage={inviteCodeErrorMsg}
            />

            {showJoinCohortError && (
              <FullWidthErrorMsg>
                {strings.checkIfInviteCodeIsValid}
              </FullWidthErrorMsg>
            )}
          </FormSection>
          <ButtonContainer className={"adaptive-alignment-horizontal"}>
            <Button type="submit" onClick={(e) => saveStudentToClassroom(e)}>
              {studentIsInCohort ? strings.addClass : strings.joinClass}
            </Button>
          </ButtonContainer>
        </Form>
      </Main>
    </PreferencesPage>
  );
}
