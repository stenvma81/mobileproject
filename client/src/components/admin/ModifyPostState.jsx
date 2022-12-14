import './admin.css';
import React, { useContext } from 'react';
import { usePosts } from '../../hooks/ApiHooks';
import { MainContext } from '../../context/MainContext';
import { postStates } from '../../utils/variables';

export function ModifyPostState({ post }) {
  const { modifyPostState } = usePosts();
  const { update, setUpdate } = useContext(MainContext);

  const handleModifyState = async (stateid, e) => {
    e.preventDefault();
    const response = await modifyPostState(post.id, stateid);
    if (response) {
      setUpdate(update + 1);
    }
  };

  const StateRadioButton = ({ postState }) => (
    <label>
      <input
        type="radio"
        value={`${postState.id}`}
        onChange={(e) => handleModifyState(e.target.value, e)}
        checked={post.stateid === postState.id}
      />
      {postState.title}
    </label>
  );

  return (
    <div className="post_state_column">
      <StateRadioButton postState={postStates.open} />
      <StateRadioButton postState={postStates.prosessing} />
      <StateRadioButton postState={postStates.closed} />
    </div>
  );
}
