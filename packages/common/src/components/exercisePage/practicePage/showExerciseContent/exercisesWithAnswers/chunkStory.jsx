import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classnames from "classnames";
import styledComponents from "styled-components";
import { BLUE } from "common/src/constants";
import drag_icon from "common/src/images/drag_icon.svg";
import { VideoScreenWithButtons } from "common/src/components/shared/others/screenWithButtons";
const Container = styledComponents.div`
&.wrong{
  color:#f00;
}
&.correct{
  color:${BLUE};
}
`;

const ChunkStory = ({
  getCurrentQuestion,
  getStudentAnswer,
  getCurrentExerciseEvaluation,
  getCurrentExerciseAnswers,
  saveNotes,
  deleteVocabulary,
  getVideoDetails,
  getCurrentQuestionIndex
}) => {
  const phrases = getCurrentQuestion();
  let studentAnswer = getStudentAnswer() || [...Array(phrases.length).keys()];
  const evaluation = getCurrentExerciseEvaluation();
  const correctAnswers = getCurrentExerciseAnswers() || [];
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
  const onDragEnd = () => {};
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
          <DragAndDropPanel
            evaluation={evaluation}
            order={studentAnswer}
            phrases={phrases}
          />
        </DragDropContext>
      </div>
      <div className="h3 px-4">The Right anwser</div>
      <div className="form-group my-3 pb-4 pt-4 px-4">
        <Anwsers order={correctAnswers} phrases={phrases} />
      </div>
    </div>
  );
};

class DragAndDropPanel extends React.Component {
  render() {
    const { phrases, order, evaluation } = this.props;
    return (
      <Droppable droppableId={"droppable-0"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {order.map((i, index) => (
              <Container
                key={index}
                className={classnames(
                  { correct: evaluation !== undefined && evaluation[index] },
                  { wrong: evaluation !== undefined && !evaluation[index] }
                )}
              >
                <Phrase id={`${index}`} index={index} phrase={phrases[i]} />
              </Container>
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
              <img src={drag_icon} className="px-2" />
            </span>
            {phrase}
          </div>
        )}
      </Draggable>
    );
  }
}
const Anwsers = ({ phrases, order }) =>
  order.map((i, index) => (
    <div key={index} className="border p-2 my-2 bg-white text-black">
      <span>
        <img src={drag_icon} className="px-2" />
      </span>
      {phrases[i]}
    </div>
  ));
export default ChunkStory;
