import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-tiger-orange text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Fortify Your Code?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Get security analysis, SOC2 compliance check, and certification recommendations in 3 minutes
        </p>
        <Link href="/dashboard" className="inline-block bg-white text-tiger-orange px-8 py-4 rounded-lg text-lg font-bold hover:bg-fortress-light transition">
          Get Started - No Login Required
        </Link>
      </div>
    </section>
  );
}
