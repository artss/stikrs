import React, { PureComponent } from 'react';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import { Link } from 'react-router-dom';

import { passwordType } from '../../../proptypes/password';
import CopyButton from '../../CopyButton';

import s from './PasswordItem.css';

export default class PasswordItem extends PureComponent {
  static propTypes = passwordType;

  render() {
    const {
      $listId,
      $id,
      title,
      login,
      password,
    } = this.props;

    return (
      <li className={s.root}>
        <Link className={s.info} to={`/lists/${$listId}/${$id}`}>
          <div className={s.title}>{title}</div>
          <div className={s.text}>{login}</div>
        </Link>

        <CopyButton text={login} className={s.button}>
          <FontIcon
            value="person"
            title="Copy login"
          />
        </CopyButton>

        <CopyButton text={password} className={s.button}>
          <FontIcon
            value="file_copy"
            title="Copy password"
          />
        </CopyButton>
      </li>
    );
  }
}
