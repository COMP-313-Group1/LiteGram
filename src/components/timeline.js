/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  // need to get the logged in users' photos (hook)
  const { photos } = usePhotos();

  // on loading the photos, need to use react skeleton
  // if there are photos, render them (create a post component)
  // if the user has no photos, tell them to create some

  // zhen: i put the code here temporarily because I can't access firebase
  // and therefore it will render the page blank
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      )}
    </div>
  );
}
