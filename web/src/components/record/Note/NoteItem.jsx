import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NoteItem({
  $listId,
  $id,
  title,
  text,
}) {
  return (
    <div>
      <Link to={`/lists/${$listId}/${$id}`}>{title}</Link>
      <div>{text}</div>
    </div>
  );
}

NoteItem.propTypes = {
  $listId: PropTypes.string.isRequired,
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
