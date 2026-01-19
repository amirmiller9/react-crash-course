import classes from './loading.module.css';

export default function Loading() {
  return (
    <div className={classes.loading}>
      <p>Loading content...</p>
      <div className={classes.spinner}></div>
    </div>
  );
}
