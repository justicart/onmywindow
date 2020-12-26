import Video from '../Video';
import christmas from '../static/christmas_full.mp4';

function Christmas() {
  return (
    <Video src={christmas} type="video/mp4" />
  );
}

export default Christmas;
