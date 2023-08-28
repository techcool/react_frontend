import React from "react";
import Select from "react-select";

const VideoSearchForm = ({
  title,
  description,
  category,
  categories,
  handleChanges,
  handleSubmit
}) =>
  <div className="mb-4">
    <form
      onSubmit={ handleSubmit }
    >
      <div className="form-row mb-4">
        <div className="col">
          <input
            id="title"
            value={ title }
            placeholder="Title"
            className="form-control"
            onChange={ handleChanges }
          />
        </div>
        <div className="col">
          <input
            id="description"
            value={ description }
            placeholder="Description"
            className="form-control"
            onChange={ handleChanges }
          />
        </div>

        <div
          className="col"
        >
          <Select
            classNamePrefix="react-select"
            isClearable={ true }
            isSearchable={ false }
            placeholder="Category"
            options={ categories.map(
              (c) => ({ value: c.id, label: c.label })
            ) }
            onChange={ option => handleChanges(
              {
                target: {
                  id: "category",
                  value: (option !== null) ? option.value : -1
                }
              }
            )
            }
          />

        </div>
        <div
          className="col d-flex justify-content-center"
        >
          <input
            type="submit"
            className="btn button-blue"
            value="filter"
          />
        </div>
      </div>
      {
        category != -1 &&
          <div className="form-row"
            key={ `id-${category}` }
          >
            {
              categories[category].details.map(
                c =>
                  <div
                    key={ c.label }
                    className="col"
                  >
                    <Select
                      placeholder="Type"
                      classNamePrefix="react-select"
                      isClearable={ true }
                      isSearchable={ false }
                      placeholder={ c.label }
                      options={ c.values.map((c) => ({ value: c.id, label: c.label })) }
                      onChange={ option => handleChanges(
                        {
                          target: {
                            id: c.code,
                            value: (option !== null) ? option.value : -1
                          }
                        }
                      )
                      }
                    />

                    { /* <select
                    id={c.code}
                    value={subCategories[c.code]}
                    className="form-control"
                    onChange={handleChanges}
                  >
                    <option value={-1}> {c.label}</option>
                    {
                      c.values.map(
                        value =>
                          <option
                            key={value.label}
                            value={value.id}
                          >
                            {value.label}
                          </option>
                      )
                    }
                  </select> */ }
                  </div>
              )
            }
          </div>
      }
    </form>
  </div>;

export default VideoSearchForm;
