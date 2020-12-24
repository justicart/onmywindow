import christmas from '../static/christmas_full.mp4';

function Christmas() {
  return (
    <video autoPlay loop muted autoBuffer playsInline>
      <source src={christmas} type="video/mp4" />
    </video>
  );
}

export default Christmas;
