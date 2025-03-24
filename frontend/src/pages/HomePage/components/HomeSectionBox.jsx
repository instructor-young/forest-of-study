function HomeSectionBox({ title, children }) {
  return (
    <section className="bg-white rounded-[20px] p-10 [&+&]:mt-10">
      <h2 className="font-extrabold text-2xl text-black-414141 mb-8">
        {title}
      </h2>

      {children}
    </section>
  );
}

export default HomeSectionBox;
