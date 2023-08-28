import { EXERCISE_CHUNK_STORY } from "common/src/constants";
import React, { Fragment, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import stringHash from "string-hash";

const ChunkStory = ({ practiceExercises, addExercise }) => {
  const { phrases, rightOrder } = practiceExercises[EXERCISE_CHUNK_STORY];
  const [newSentence, setNewSentence] = useState("");

  const onDragEndRandom = (event) => {
    const { source, destination } = event;
    if (!destination)
      return;
    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;
    const phrasesCopy = [...phrases];    
    const orderOfPhrasesBeforeUpdate=[];

    for(let i=0;  i< phrases.length;i++){
      let phrase=phrases[rightOrder[i]];
      orderOfPhrasesBeforeUpdate.push(stringHash(phrase));
    }

    let tmp = phrasesCopy[sourceIndex];
    let step = (destinationIndex > sourceIndex) ? 1 : -1;

    for (let index = sourceIndex; index !== destinationIndex; index = index + step) {
      phrasesCopy[index] = phrasesCopy[index + step];
    }

    phrasesCopy[destinationIndex] = tmp;

    addExercise({
      exercise_id: EXERCISE_CHUNK_STORY,
      question: {
        phrases: phrasesCopy
      }
    });

    const orderOfPhrasesAfterUpdate={};
    for(let i=0;  i< phrasesCopy.length;i++){
      let phrase=phrasesCopy[i];
      orderOfPhrasesAfterUpdate[stringHash(phrase)]=i;
    }

    const newOrder=[];
    for(let hash of orderOfPhrasesBeforeUpdate){
      newOrder.push(orderOfPhrasesAfterUpdate[hash]);
    }

    addExercise({
      exercise_id: EXERCISE_CHUNK_STORY,
      question: {
        rightOrder: newOrder
      }
    });

  };

  const onDragEndCorrect = (event) => {
    const { source, destination } = event;
    if (!destination)
      return;
    const { index: sourceIndex } = source;
    const { index: destinationIndex } = destination;
    const newOrder = [...rightOrder];
    let tmp = newOrder[sourceIndex];
    let step = (destinationIndex > sourceIndex) ? 1 : -1;
    for (let index = sourceIndex; index !== destinationIndex; index = index + step)
      newOrder[index] = newOrder[index + step];
    newOrder[destinationIndex] = tmp;
    addExercise({
      exercise_id: EXERCISE_CHUNK_STORY,
      question: {
        rightOrder: newOrder
      }
    });

  };
  return (
    <Fragment>
      <h1>
        The chunk story
      </h1>
      <div className="form-group">
        <label>
          Add new sentence
        </label>
        <textarea
          type="text"
          value={ newSentence }
          className="form-control"
          style={ { resize: "none" } }
          onChange={ e => setNewSentence(e.target.value) }
        />
      </div>
      <input
        type="button"
        value="Add new sentence"
        className="btn btn-primary block full-width m-b"
        onClick={
          () => {
            addExercise({
              exercise_id: EXERCISE_CHUNK_STORY,
              question: {
                phrases: [...phrases, newSentence],
                rightOrder: Array(phrases.length + 1)
                  .fill()
                  .map((e, index) => index)
              }
            });
            setNewSentence("");
          }
        }
      />
      <input
        type="button"
        value="Reset"
        className="btn btn-danger block full-width m-b"
        onClick={
          () => {
            addExercise({
              exercise_id: EXERCISE_CHUNK_STORY,
              question: {
                phrases: [],
                rightOrder: []
              }
            });
            setNewSentence("");
          }
        }
      />
      <div className="row">
        <div className="col-md-6 border" >
          <div className="font-weight-bold h3">
            The correct order
          </div>
        </div>
        <div className="col-md-6 border" >
          <div className="font-weight-bold h3">
            The random order of sentences
          </div>
        </div>
        <div className="col-md-6 border" >
          <DragDropContext
            onDragEnd={ onDragEndCorrect }
          >
            <DragAndDropPanel
              order={ rightOrder }
              phrases={ phrases }
            />
          </DragDropContext>
        </div>
        <div className="col-md-6 border" >
          <DragDropContext
            onDragEnd={ onDragEndRandom }
          >
            <DragAndDropPanel
              order={ Object.keys([...Array(phrases.length)]) }
              phrases={ phrases }
            />
          </DragDropContext>
        </div>
      </div>
    </Fragment>
  );
};

class DragAndDropPanel extends React.Component {
  render() {
    const { order, phrases } = this.props;
    return (
      <Droppable
        droppableId={ "droppable-0" }
      >
        {
          provided => (
            <div
              ref={ provided.innerRef }
              { ...provided.droppableProps }
            >
              {
                order.map((i, index) =>
                  <Phrase
                    key={ index }
                    id={ `${index}` }
                    index={ index }
                    phrase={ phrases[i]
                    }
                  />
                )
              }
              { provided.placeholder }
            </div>
          ) }
      </Droppable>
    );
  }
}


class Phrase extends React.Component {
  render() {
    const { phrase } = this.props;
    return (
      <Draggable
        draggableId={ this.props.id }
        index={ this.props.index }
      >
        {
          provided => (
            <div
              ref={ provided.innerRef }
              { ...provided.draggableProps }
              { ...provided.dragHandleProps }
              className="border border-dark p-2 my-2"
            >
              { phrase }
            </div>
          ) }
      </Draggable>
    );
  }
}

export default ChunkStory;
