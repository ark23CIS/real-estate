import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { createProfile } from "../../../redux/actions";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./create-profile.scss";

function index({ history }) {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = React.useState({
    dateOfBirth: null,
    file: "",
  });
  const onFieldChange = React.useCallback(
    (e) => {
      const target = e.target;
      setProfileData((profileData) => ({
        ...profileData,
        [target.name]: target.value,
      }));
    },
    [profileData]
  );
  const onFileChange = React.useCallback(
    (e) => {
      const file = e.target.files[0];
    },
    [profileData]
  );
  const onClick = React.useCallback(() => {
    dispatch(createProfile(profileData, history));
  }, [profileData]);
  console.log(profileData);
  return (
    <div className="profile-data-form">
      Social Networks
      <input type="text" name="vk" placeholder="vk" onChange={onFieldChange} />
      <input
        type="text"
        name="instagram"
        placeholder="instagram"
        onChange={onFieldChange}
      />
      <input
        type="text"
        name="facebook"
        placeholder="facebook"
        onChange={onFieldChange}
      />
      <input
        type="text"
        name="twitter"
        placeholder="twitter"
        onChange={onFieldChange}
      />
      <input
        type="text"
        name="youtube"
        placeholder="youtube"
        onChange={onFieldChange}
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="type Your number"
        required
        onChange={onFieldChange}
      />
      <DatePicker
        selected={profileData.dateOfBirth}
        onChange={(date) =>
          setProfileData((profileData) => ({
            ...profileData,
            dateOfBirth: date,
          }))
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="type year of birth"
        required
      />
      <input
        type="file"
        name="photo"
        onChange={onFileChange}
        value={profileData.file}
      />
      <button onClick={onClick} className="primary-button">
        Submit
      </button>
    </div>
  );
}

export default React.memo(withRouter(index));
