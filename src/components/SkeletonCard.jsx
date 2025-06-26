import '../pages/styles/Home.css';
export default function SkeletonCard() {
  return (
    <div className="recipe-grid__item skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-subtext"></div>
    </div>
  );
}
