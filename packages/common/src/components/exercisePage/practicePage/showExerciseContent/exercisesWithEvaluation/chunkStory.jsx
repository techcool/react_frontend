import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import CompleteActivityButton from 'common/src/components/shared/completeActivityButton';
import styledComponents from 'styled-components'
import { BLUE } from 'common/src/constants';
import { StickyContainer } from 'common/src/components/shared/container';
import drag_icon from 'common/src/images/drag_icon.svg';

const Container = styledComponents.div`
&.wrong{
  color:#f00;
}
&.correct{
  color:${BLUE};
}
`

const ChunkStory = ({
  getCurrentQuestion,
  updateStudentAnswer,
  getStudentAnswer,
  getCurrentExerciseEvaluation,
  isCurrentExerciseCompleted,
}) => {
  const phrases = getCurrentQuestion();
  let studentAnswer = getStudentAnswer();
  const evaluation = getCurrentExerciseEvaluation();

  if (!studentAnswer) {
    studentAnswer = [...Array(phrases.length).keys()]
    updateStudentAnswer({ answer: studentAnswer })
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination)
      return
    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;
    studentAnswer = getStudentAnswer();
    let tmp = studentAnswer[sourceIndex]
    let step = (destinationIndex > sourceIndex) ? 1 : -1

    for (let index = sourceIndex; index !== destinationIndex; index = index + step)
      studentAnswer[index] = studentAnswer[index + step]

    studentAnswer[destinationIndex] = tmp
    updateStudentAnswer({ answer: studentAnswer })
  }
  return (
    <div className="d-flex flex-column">
      <StickyContainer
        className="d-flex justify-content-end mr-1"
      >
        <CompleteActivityButton
          onClick={() => updateStudentAnswer({ completed: true })}
          isCompleted={isCurrentExerciseCompleted()}
        />
      </StickyContainer>
      <div className="form-group my-3 pb-4 pt-4 px-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <DragAndDropPanel
            evaluation={evaluation}
            order={studentAnswer}
            phrases={phrases}
          />
        </DragDropContext>

      </div>
    </div>
  )
}

class DragAndDropPanel extends React.Component {
  render() {
    const { phrases, order, evaluation } = this.props;
    return (
      <Droppable
        droppableId={"droppable-0"}
      >
        {
          provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                order.map((i, index) =>
                  <Container
                    className={
                      classnames(
                        { 'correct': evaluation !== undefined && evaluation[index] },
                        { 'wrong': evaluation !== undefined && !evaluation[index] }
                      )
                    }
                  >
                    <Phrase key={index} id={`${index}`} index={index} phrase={phrases[i]} />
                  </Container>
                )
              }
              {provided.placeholder}
            </div>
          )}
      </Droppable>
    )
  }
}


class Phrase extends React.Component {
  render() {
    const { phrase } = this.props
    return (
      <Draggable
        draggableId={this.props.id}
        index={this.props.index}
      >
        {
          provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="border p-2 my-2 bg-white"
            >
              <span><img src={drag_icon} className="px-2"/></span>{phrase}
            </div>
          )}
      </Draggable>
    )
  }
}

export default ChunkStory;
