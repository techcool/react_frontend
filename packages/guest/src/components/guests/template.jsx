import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import logo from 'common/src/images/logo.jpg';

const Template = ({ children }) =>
  <div className='row h-100'>
    <div className={classnames(
      'd-none', 'd-md-block', 'col-5',
      'justify-content-center'
    )}
    >
      <a href='https://learnlit.online/'>
        <img
          src={logo}
          style={{ position: 'fixed', width: 'auto', height: '100%' }}
        />
      </a>
    </div>
    <div
      className={classnames('col-1')}
    >
    </div>
    <div
      className={classnames(
        'col-md-5', 'col-10',
        'row', 'align-items-center',
        'px-3', 'mx-0', 'bg-white'
      )}
    >
      <div
        className={classnames(
          'w-100', 'h-100',
          'd-flex', 'flex-column', 'justify-content-center',
        )}
      >
        <div>
          <h1 className="text-black my-2">
            Welcome to <span className='font-weight-bold text-dark-blue'>Lit</span>
          </h1>
          <p className='pt-3' style={{ fontSize: '13px' }}>
            Language acquisition through digital stories.
          </p>
        </div>
        {children}
      </div>
    </div>

    <div
      className={classnames('col-1', 'd-none', 'd-md-block')}
    >
    </div>

  </div>

export default Template;
