const SectionWrapper = ({ id, children }) => {
  return (
    <section className="pt-24 md:pt-26" id={id}>
      {children}
    </section>
  );
};

export default SectionWrapper;
