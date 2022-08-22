import styles from "./Rating.module.scss";

type Props = { vote_average: number };

function Rating({ vote_average }: Props) {
  return (
    <>
      <span className={styles.vote}>
        <i className="bi bi-star-fill"></i>
        {` `}
        {vote_average.toFixed(1)}
      </span>
      {`/10 `}
    </>
  );
}

export default Rating;
