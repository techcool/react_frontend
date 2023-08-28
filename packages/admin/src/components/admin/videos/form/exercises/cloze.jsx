import Container from "common/src/components/shared/container";
import { EXERCISE_CLOZE } from "common/src/constants";
import React, { Fragment } from "react";

const Cloze = ({ practiceExercises, addExercise }) => {
  const { phrases, options, rightOrder } = practiceExercises[EXERCISE_CLOZE];
  const paragraph = phrases.join("____");
  return (
    <Fragment>
      <h1>
        Cloze
      </h1>
      <div className="from-group">
        <label>Paragraph <small>refer to the gaps with(____) 4 underscores</small></label>
        <textarea
          type="text"
          value={ paragraph }
          rows="10"
          className="form-control"
          style={ { resize: "none" } }
          onChange={ e => {
            const newText = e.target.value;
            const gapsCount = (newText.match(/____/g) || []).length;
            addExercise({
              exercise_id: EXERCISE_CLOZE,
              question: {
                phrases: newText.split("____"),
                options: (gapsCount >= options.length)
                  ?
                  [...options, ...Array(gapsCount - options.length).fill("")]
                  :
                  options.slice(0, gapsCount),
                rightOrder: (gapsCount === options.length)
                  ?
                  rightOrder
                  :
                  Array(gapsCount).fill(-1)
              }
            });
          } }
        />
      </div>
      <div>
        <div>
          List words <small>add them in the order you want to see them in the exercise</small>
        </div>
        <table className="table">
          <thead>
            <th scope="col">#</th>
            <th scope="col">word</th>
          </thead>
          <tbody>
            {
              options.map((option, index) =>
                <tr key={ index }>
                  <td>
                    { index }
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={ option }
                      onChange={ (e) => {
                        let newOptions = [...options];
                        newOptions[index] = e.target.value;
                        addExercise({
                          exercise_id: EXERCISE_CLOZE,
                          question: {
                            options: newOptions
                          }
                        });
                      }
                      }
                    />
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div>
        <div>
          Preview <small> Select the right answers in the preview</small>
        </div>
        <div className="border">
          {
            <Preview
              { ...{
                rightOrder,
                addExercise,
                options,
                paragraph
              } }
            />
          }
        </div>
      </div>
    </Fragment>
  );
};

const Preview = ({
  rightOrder,
  options,
  paragraph,
  addExercise
}) => {
  const phrases = paragraph.split("____");
  let phrasesCount = phrases.length;
  const lastPhrase = phrases[phrases.length - 1];
  return (
    <Container
      style={ {
        margin: "0px ",
        padding: "10px"
      } }
    >
      {
        phrases
          .slice(0, phrasesCount - 1)
          .map(
            (phrase, index) =>
              <Fragment key={ index }>
                {
                  phrase.split("\n").length === 1
                    ?
                    phrase
                    :
                    phrase.split("\n").map((p, index) =>
                      (
                        <Fragment key={ index }>
                          { p }
                          { (index < phrase.split("\n").length - 1) && <br /> }
                        </Fragment>
                      )
                    )
                }
                <select
                  style={ { minWidth: "150px" } }
                  onChange={
                    e => {
                      const newOrder = [...rightOrder];
                      newOrder[index] = parseInt(e.target.value);
                      addExercise({
                        exercise_id: EXERCISE_CLOZE,
                        question: {
                          rightOrder: newOrder
                        }
                      });
                    }
                  }
                >
                  <option value={ -1 }></option>
                  { options.map((option, i) =>
                    <option  key={ i } value={ i } selected={ rightOrder[index] === i }>{ option }</option>
                  ) }
                </select>
              </Fragment>
          )
      }
      {
        lastPhrase.split("\n").length === 1
          ?
          lastPhrase
          :
          lastPhrase.split("\n").map((p,index) =>
            <Fragment key={ index }>
              { p }
              <br />
            </Fragment>
          )
      }
    </Container>
  );
};

export default Cloze;
