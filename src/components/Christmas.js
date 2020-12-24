import christmas from '../static/christmas.mp4';
import christmas_webm from '../static/christmas.webm';

function Christmas() {
  return (
    <video autoPlay loop muted autoBuffer playsInline>
      <source src={christmas} type="video/mp4" />
    </video>
  );
}

export default Christmas;
