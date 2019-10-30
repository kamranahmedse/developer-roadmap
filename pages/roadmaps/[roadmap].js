import { useRouter } from 'next/router';
import DefaultLayout from '../../layouts/default/index';
import PageHeader from '../../components/page-header/index';
// import roadmaps from "../../data/roadmaps";

const Roadmap = (props) => {
  const router = useRouter();
  const {
    roadmap: slug,
  } = router.query;

  console.log(router);

  // @todo handle 404
  // const roadmap = roadmaps.find(roadmap => roadmap.slug === slug);

  return (
    <DefaultLayout>
      <PageHeader />
      <div className="container">
        {/*<img src={ roadmap.picture } alt="" />*/}
      </div>
    </DefaultLayout>
  );
};

export default Roadmap;