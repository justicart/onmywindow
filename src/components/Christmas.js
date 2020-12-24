import christmas from '../static/christmas.webm';

function Christmas() {
  return <video src={christmas} autoPlay loop muted autoBuffer playsInline />;
}

export default Christmas;
