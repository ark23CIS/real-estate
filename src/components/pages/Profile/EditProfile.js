import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';
import { Avatar } from '@material-ui/core';

function EditProfile({ isEditPageVisible, profile }) {
  const dispatch = useDispatch();
  const [picture, setPicture] = React.useState([]);
  const onPhotosChange = React.useCallback(
    (picture) => {
      setPicture(picture[0]);
    },
    [setPicture],
  );

  return (
    <div>
      <Avatar src={profile.photo} />
      {picture.length !== 0 && (
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText={`Change profile image`}
          onChange={onPhotosChange}
          imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
          maxFileSize={5242880}
          singleImage={true}
          style={{ height: '200px' }}
        />
      )}
      {!picture.length && profile && <img src={profile.photo} />}
      <div>Edit</div>
    </div>
  );
}

EditProfile.PropTypes = {
  isEditPageVisible: PropTypes.bool,
  profile: PropTypes.object.isRequired,
};

EditProfile.defaultProps = {
  isEditPageVisible: false,
};

export default EditProfile;
