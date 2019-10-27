import { useRouter } from 'next/router'

// Fallback page to handle the routing for the old roadmap pages
const Fallback = () => {
  const router = useRouter();
  const { fallback } = router.query;

  return (
    <div>
      <h1>{ fallback }</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolorum ea earum exercitationem fuga magnam nihil nostrum numquam optio provident quaerat repellendus, repudiandae vitae voluptas, voluptatibus. Consequuntur doloremque maxime perferendis!</p>
    </div>
  );
};

export default Fallback;