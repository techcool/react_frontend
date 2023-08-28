import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CompleteActivityButton from "common/src/components/shared/completeActivityButton";
import { StickyContainer } from "common/src/components/shared/container";
import drag_icon from "common/src/images/drag_icon.svg";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const ChunkStory = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  isCurrentExerciseCompleted,
  getCurrentQuestionIndex,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
}) => {
  const phrases = getCurrentQuestion();
  let studentAnswer = getStudentAnswer();

  if (!studentAnswer) {
    studentAnswer = [...Array(phrases.length).keys()];
    updateStudentAnswer({ answer: studentAnswer });
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;
    studentAnswer = getStudentAnswer();
    let tmp = studentAnswer[sourceIndex];
    let step = destinationIndex > sourceIndex ? 1 : -1;

    for (
      let index = sourceIndex;
      index !== destinationIndex;
      index = index + step
    )
      studentAnswer[index] = studentAnswer[index + step];

    studentAnswer[destinationIndex] = tmp;
    updateStudentAnswer({ answer: studentAnswer });
  };
  const {
    url: Url,
    grammar,
    vocabulary,
    notes: Notes,
    captionUrl,
    language,
    _id: video_id,
    level,
    category,
    title,
    description,
  } = getVideoDetails();
  const { t } = getCurrentQuestion();
  return (
    <div className="d-flex flex-column">
      <VideoScreenWithButtons
        key={`key-${getCurrentQuestionIndex()}`}
        hide={true}
        {...{
          url: Url,
          captionUrl,
          grammar,
          vocabulary,
          notes: Notes,
          video_id,
          level,
          category,
          title,
          description,
          saveNotes,
          language,
          t,
          highlight: [
            {
              time: t || 0,
              text: `Question`,
            },
          ],
          deleteVocabulary,
        }}
      />
      <div className="form-group my-3 pb-4 pt-4 px-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <DragAndDropPanel order={studentAnswer} phrases={phrases} />
        </DragDropContext>
      </div>
      <StickyContainer className="d-flex ml-4">
        <CompleteActivityButton
          onClick={() => updateStudentAnswer({ completed: true })}
          isCompleted={isCurrentExerciseCompleted()}
        />
      </StickyContainer>
    </div>
  );
};

class DragAndDropPanel extends React.Component {
  render() {
    const { phrases, order } = this.props;
    return (
      <Droppable droppableId={"droppable-0"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {order.map((i, index) => (
              <Phrase
                key={index}
                id={`${index}`}
                index={index}
                phrase={phrases[i]}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

class Phrase extends React.Component {
  render() {
    const { phrase } = this.props;
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="border p-2 my-2 bg-white text-black"
          >
            <span>
              <img src={drag_icon} className="px-2" alt="" />
            </span>
            {phrase}
          </div>
        )}
      </Draggable>
    );
  }
}

export default ChunkStory;
