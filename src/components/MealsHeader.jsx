import classes from './MealsHeader.module.css';

export default function MealsHeader({ title, children }) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <div className={classes.content}>
        {children}
      </div>
    </header>
  );
}
