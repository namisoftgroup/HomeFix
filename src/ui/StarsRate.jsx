export default function StarsRate({ rate }) {
  return (
    <div className="stars_rate">
      <div className="stars">
        {rate
          ? Array(Math.round(rate))
              .fill(0)
              .map(() => {
                return (
                  <img
                    key={Math.random()}
                    src="/icons/star-filled.svg"
                    alt="filled star"
                  />
                );
              })
          : null}
        {rate
          ? Array(5 - Math.round(rate))
              .fill(0)
              .map(() => {
                return (
                  <img
                    key={Math.random()}
                    src="/icons/star.svg"
                    alt="star"
                  />
                );
              })
          : null}
      </div>
    </div>
  );
}
