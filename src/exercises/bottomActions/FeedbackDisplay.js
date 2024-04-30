import * as s from "./FeedbackButtons.sc.js";
import { useState, useEffect } from "react";
import FeedbackButtons from "./FeedbackButtons.js";
import { EXERCISE_TYPES } from "../ExerciseTypeConstants.js";
import { toast } from "react-toastify";

export default function FeedbackDisplay({
  showFeedbackButtons,
  setShowFeedbackButtons,
  currentExerciseType,
  currentBookmarksToStudy,
  feedbackFunction,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [userFeedback, setUserFeedback] = useState();

  useEffect(() => {
    if (currentExerciseType !== EXERCISE_TYPES.match) {
      setSelectedId(currentBookmarksToStudy[0].id);
    } else {
      setSelectedId(null);
    }
    console.log(selectedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      toast.dismiss();
    };
  }, [currentExerciseType]);

  function notifyUser(feedbackMessage) {
    toast.success(feedbackMessage, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    feedbackFunction(userFeedback, selectedId);
  }
  return (
    <s.FeedbackHolder>
      <FeedbackButtons
        show={showFeedbackButtons}
        setShow={setShowFeedbackButtons}
        currentExerciseType={currentExerciseType}
        currentBookmarksToStudy={currentBookmarksToStudy}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        notifyUser={notifyUser}
        setUserFeedback={setUserFeedback}
      />
    </s.FeedbackHolder>
  );
}
