import MealsHeader from '../../../components/MealsHeader';
import classes from './page.module.css';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Foodies Community',
  description: 'Join our community and share your favorite recipes!',
};

export default function CommunityPage() {
  return (
    <main className={classes.main}>
      <MealsHeader title="Community Page">
        <p className={classes.text}>Join our vibrant community of food lovers!</p>
      </MealsHeader>
    </main>
  );
}
