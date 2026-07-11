// Renders content that may be rich HTML (written via the admin's CKEditor) or a
// legacy plain string. Content is the site owner's own, authored locally.
const HAS_TAGS = /<[a-z][\s\S]*>/i

export default function Prose({ html, className = '' }) {
  if (!html) return null
  if (!HAS_TAGS.test(html)) return <p className={className}>{html}</p>
  return <div className={`prose-rich ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
