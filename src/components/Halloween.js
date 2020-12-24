import halloween from '../static/halloween.webm';

function Christmas() {
  return <video src={halloween} autoPlay loop muted autoBuffer playsInline />;
}

export default Christmas;
