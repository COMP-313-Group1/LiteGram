import PropTypes from 'prop-types';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
}) {
  return <p>I am a suggested profile {username} </p>;
}

SuggestedProfile.prototype = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
