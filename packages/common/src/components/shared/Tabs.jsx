import React, { Fragment } from 'react';
import classnames from 'classnames';
import { useState } from 'react';

const Tabs = ({ labels = [], components = [], prefix }) => {
  const [selected, setSelected] = useState(0);
  return (<Fragment>
    <ul className="nav nav-tabs">
      {
        labels.map((label, index) =>
          <li className="nav-item">
            <a
              className={classnames("nav-link ", { "active": index === selected })}
              onClick={() => setSelected(index)}
            >
              {label}
            </a>
          </li>
        )}
    </ul>
    <div className="tab-content" >
      {
        components.map(
          (Component, index) =>
            (index === selected) ?
              <div
                key={index}
                className={
                  classnames(
                    "tab-pane fade",
                    "show active"
                  )
                }
                role="tabpanel"
              >
                <Component />
              </div>
              :
              null
        )
      }
    </div>
  </Fragment>)
}

export default Tabs;