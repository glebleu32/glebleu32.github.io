export default function Badge({ label, variant = 'diet' }) {
  const styles = {
    cuisine: 'bg-brand-100 text-brand-700 border border-brand-200',
    diet: 'bg-gray-100 text-gray-600 border border-gray-200',
    time: 'bg-warm-50 text-warm-600 border border-warm-400',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}
