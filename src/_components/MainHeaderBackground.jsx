import classes from './MainHeaderBackground.module.css';

export default function MainHeaderBackground() {
  return (
    <div className={classes['header-background']}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#59442b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#281a0c', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          fillOpacity="1"
          d="M0,256L48,240C96,224,192,192,288,160C384,128,480,96,576,112C672,128,768,192,864,192C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}
