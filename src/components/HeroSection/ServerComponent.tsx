import Image from "next/image";
import Link from "next/link";

export const heading1 = (
  <>
    <h1 className="font-heading mb-6">Unlock Your Learning Potential</h1>
    <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg">
      Connect with experienced student tutors for academic support and personal
      learning.
    </p>
    <Link href="/rooms">
      <button className="btn-secondary">Get Started</button>
    </Link>
  </>
);

export const section2 = (
  <div className="md:grid hidden gap-8 grid-cols-1">
    <div className="rounded-2xl overflow-hidden h-48">
      <Image
        src="/images/hero-12.jpeg"
        alt="hero-1"
        width={300}
        height={300}
        className="img scale-animation"
      />
    </div>

    <div className="grid grid-cols-2 gap-8 h-48">
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/hero-2.jpeg"
          alt="hero-2"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/hero-4.jpeg"
          alt="hero-4"
          width={300}
          height={300}
          className="img scale-animation"
        />
      </div>
    </div>
  </div>
);
