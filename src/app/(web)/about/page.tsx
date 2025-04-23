"use client";

import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen py-16 px-6 md:px-20 bg-white text-gray-900">
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">About Us</h1>
     <p className="text-lg leading-relaxed mb-8">
  Welcome to <span className="font-semibold text-tertiary-dark">Agenda</span> — your trusted student-to-student
  tutoring platform based right on the University of Ghana campus.
  <br />
  <br />
  Our mission is simple: to connect students with skilled peer tutors who understand the coursework, campus life,
  and the challenges that come with both. Whether you&rsquo;re struggling with a tough class or want to help others
  succeed, Agenda is the bridge between support and success.
</p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Why Agenda?</h2>
            <ul className="list-disc ml-5 text-base space-y-2">
              <li>Built by students, for students of University of Ghana.</li>
              <li>
                Affordable and flexible tutoring that works around your
                schedule.
              </li>
              <li>
                Get academic help from peers who’ve taken the same courses.
              </li>
              <li>Safe, trusted, and always on campus.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-100 p-6 rounded-xl shadow-inner">
          <h3 className="text-xl font-semibold mb-2">Join us!</h3>
          <p className="mb-4">
            Whether you're looking to tutor or be tutored, Agenda is here for
            you. Let's build a stronger academic community together at Legon.
          </p>
          <Link href="/auth">
            <button className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
