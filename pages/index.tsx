import Head from "next/head";

import styles from "../styles/Home.module.css";

import { useStars } from "../models/Star";

export default function Home() {
  const { stars } = useStars();

  return (
    <div className={styles.container}>
      <Head>
        <title>Starry Night</title>
        <meta name="description" content="Starry Night" />
        <meta name="app-env" content={process.env.NODE_ENV} />
        <meta name="app-version" content="1.0.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* STARS */}

      <section className={styles.starContainer}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              transform: `translate(${star.pos.x}px, ${star.pos.y}px)`,
              backgroundColor: `rgb(${star.color.r},${star.color.g},${star.color.b})`,
            }}
            className={[
              styles.star,
              star.lifespanTime < 2000 ? styles.starFading : null,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </section>
    </div>
  );
}
