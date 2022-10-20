import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

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
      <p>I am the timeline</p>
    </div>
  );
}
