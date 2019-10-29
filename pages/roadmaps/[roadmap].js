import { useRouter } from 'next/router';
import DefaultLayout from '../../layouts/default/index';
import PageHeader from '../../components/page-header/index';

const Roadmap = (props) => {
  const router = useRouter();
  const {
    roadmap = props.roadmap,
  } = router.query;

  return (
    <DefaultLayout>
      <PageHeader />
      <p>Show roadmap for { roadmap } here</p>
    </DefaultLayout>
  );
};

export default Roadmap;