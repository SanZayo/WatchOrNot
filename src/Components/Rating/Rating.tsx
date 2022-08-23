import styles from "./Rating.module.scss";

type Props = { vote_average: number };

function Rating({ vote_average }: Props) {
  return (
    <>
      {vote_average > 0 && (
        <>
          <>
            <span className={styles.vote}>
              <i className={"bi bi-star-fill " + styles.star}></i>
              {` `}
              {vote_average.toFixed(1)}
            </span>
            {`/10 `}
          </>
          <i className="bi bi-dot"></i>
        </>
      )}
    </>
  );
}

export default Rating;
