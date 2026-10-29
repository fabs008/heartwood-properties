// Lazy image that fades in once decoded, instead of popping in.
const markLoaded = (el) => el.classList.add('is-loaded')

export default function Img({ className = '', ...props }) {
  return (
    <img
      {...props}
      className={`img-fade ${className}`}
      loading="lazy"
      decoding="async"
      ref={(el) => { if (el?.complete && el.naturalWidth) markLoaded(el) }}
      onLoad={(e) => markLoaded(e.currentTarget)}
    />
  )
}
