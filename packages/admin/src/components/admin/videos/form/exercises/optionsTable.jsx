import classnames from "classnames";
import isBlank from "common/src/components/helpers/isBlank";
import React from "react";

const OptionsTable = ({
  answers,
  newAnswer,
  rightAnswer,
  setAnswers,
  setNewAnswer,
  setRightAnswer
}) =>
  <table className="table">
    <thead>
      <tr>
        <th scope="col" >
          Content
        </th>
        <th scope="col">
          actions
        </th>
      </tr>
    </thead>
    <tbody>
      { answers.map((opt, index) =>
        <tr key={ index }>
          <td>
            { opt }
          </td>
          <td>
            <input
              type="button"
              className={ classnames(
                "btn",
                { "btn-warning": rightAnswer !== index },
                { "btn-primary": rightAnswer === index }
              )
              }
              value="Select as correct"
              onClick={ () => setRightAnswer(index) }
            />
          </td>
          <td>
            <input
              type="button"
              className="btn btn-danger "
              value="Delete"
              onClick={ () => {
                setAnswers((items) => items.filter((item, indx) => index !== indx));
                setRightAnswer(0);
              } }
            />
          </td>
        </tr>
      )
      }
      <tr>
        <td>
          <input
            value={ newAnswer }
            className="form-control"
            onChange={ e => setNewAnswer(e.target.value) }
          />
        </td>
        <td>
          <input
            type="button"
            className="btn btn-primary block full-width m-b"
            value="Add"
            onClick={ () => {
              if (isBlank(newAnswer))
                return;
              setAnswers((items) => [...items, newAnswer]);
              setNewAnswer("");
            } }
          />
        </td>
      </tr>
    </tbody>
  </table>;

export default OptionsTable;
