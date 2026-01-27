import classes from './layout.module.css';

export const metadata = {
  title: 'Authentication',
  description: 'Login or create a new account.',
};

export default function AuthLayout({ children }) {
  return (
    <div className={classes.authLayout}>
      {children}
    </div>
  );
}
