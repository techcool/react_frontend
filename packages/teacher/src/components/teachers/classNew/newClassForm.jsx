import React from "react";
import Select from "react-select";
import Form from "common/src/components/shared/form";
import convertToRankString from "common/src/components/helpers/convertToRankString";

const NewClassForm = ({ name, grade, handleChanges, handleSubmit }) => (
  <Form
    title="Create new class"
    onSubmit={handleSubmit}
    style={{ backgroundColor: "white" }}
  >
    <div className="form-group">
      <input
        type="text"
        id="name"
        value={name}
        placeholder="Class name"
        autoComplete="off"
        className="form-control input-bg"
        onChange={(e) => handleChanges(e)}
        required
      />
    </div>

    <div className="form-group" style={{ position: "relative" }}>
      <Select
        classNamePrefix="react-select"
        className="mb-0 lit-react-select grey2"
        placeholder="Grade"
        isClearable={false}
        isSearchable={false}
        placeholder="Grade"
        options={[
          ...Array(12)
            .fill(0)
            .map((v, i) => {
              return { value: i + 1, label: convertToRankString(i + 1) };
            }),
          { value: -1, label: "Other" },
        ]}
        onChange={(option) => {
          handleChanges({
            target: {
              id: "grade",
              value: option.value,
            },
          });
        }}
      />
      <input
        tabIndex={-1}
        autoComplete="off"
        value={grade}
        required
        style={{
          opacity: 0,
          height: 0,
          position: "absolute",
          display: "block",
          bottom: 0,
        }}
      />
    </div>
    <div className="d-flex justify-content-center mt-4">
      <button
        name="submit"
        className="btn primary-btn btn-block"
        style={{ marginRight: "auto" }}
      >
        Create
      </button>
    </div>
  </Form>
);
export default NewClassForm;
