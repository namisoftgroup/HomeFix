

const WorkCard = ({ image, title, category }) => {
  return (
    <div className="work-card">
      <img src={image} alt={title} className="work-card__image" />
      <div className="work-card__content">
        <span className="work-card__category">{category}</span>
        <h3 className="work-card__title">{title}</h3>
      </div>
    </div>
  );
};

export default WorkCard;
