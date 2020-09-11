import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { createProfile } from "../../../redux/actions";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./create-profile.scss";

function index({ history }) {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = React.useState({ dateOfBirth: null });
  const onChange = React.useCallback(
    (e) => {
      const target = e.target;
      setProfileData((profileData) => ({
        ...profileData,
        [target.name]: target.value,
      }));
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
      <input type="text" name="vk" placeholder="vk" onChange={onChange} />
      <input
        type="text"
        name="instagram"
        placeholder="instagram"
        onChange={onChange}
      />
      <input
        type="text"
        name="facebook"
        placeholder="facebook"
        onChange={onChange}
      />
      <input
        type="text"
        name="twitter"
        placeholder="twitter"
        onChange={onChange}
      />
      <input
        type="text"
        name="youtube"
        placeholder="youtube"
        onChange={onChange}
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="type Your number"
        required
        onChange={onChange}
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
      <button onClick={onClick} className="primary-button">
        Submit
      </button>
    </div>
  );
}

export default React.memo(withRouter(index));
