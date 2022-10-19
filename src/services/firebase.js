import { fireBase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await fireBase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

// get user from the firestore where userId == userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await fireBase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId) {
  const result = await fireBase.firestore().collection('users').limit(10).get();
  console.log(result);
  return result;
}
