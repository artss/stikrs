import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { noteType } from '../../../proptypes/note';
import { updateItem } from '../../../actions/items';
import Sticker from '../../Sticker';
import DebouncedInput from '../../DebouncedInput';
import NoteEditor from '../../NoteEditor';

import s from './NotePage.css';


class NotePage extends PureComponent {
  static propTypes = {
    ...noteType,
    updateItem: PropTypes.func.isRequired,
  };

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  onTextChange = (text) => {
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { text });
  }

  render() {
    const {
      $listId,
      // $id,
      title,
      text,
    } = this.props;

    const headTitle = title || 'Note';

    return (
      <Sticker
        className={s.root}
        backUrl={`/lists/${$listId}`}
        title={headTitle}
      >
        <DebouncedInput
          className={s.input}
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
        />

        <div className={s.text}>
          <NoteEditor
            value={text}
            onChange={this.onTextChange}
          />
        </div>
      </Sticker>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
