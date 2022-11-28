import './admin.css';
import React, { useContext } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import { MainContext } from '../../context/MainContext';

export function ModifyPostState({ post }) {
  const { modifyPostState } = usePosts();
  const { update, setUpdate } = useContext(MainContext);

  const handleModifyState = async (stateid, e) => {
    e.preventDefault();
    const response = await modifyPostState(post.id, stateid);
    if (response) {
      console.log('post state modified');
      setUpdate(update + 1);
    }
  };

  // Check if it's the post's current state
  const isSelected = (value) => {
    const stateid = parseInt(value);
    return post.stateid === stateid;
  };

  const StateRadioButton = ({ label, stateid }) => {
    return (
      <label>
        <input
          type="radio"
          value={`${stateid}`}
          onChange={(e) => handleModifyState(e.target.value, e)}
          checked={isSelected(`${stateid}`)}
        />
        {label}
      </label>
    );
  };

  return (
    <div className="column">
      <StateRadioButton label={'Open'} stateid={0} />
      <StateRadioButton label={'Prosessing'} stateid={1} />
      <StateRadioButton label={'Closed'} stateid={2} />
    </div>
  );
}
