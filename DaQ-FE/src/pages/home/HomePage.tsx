import Slideshow from "../../components/Slideshow";

export default function HomePage() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Slide 1",
      subtitle: "Subtitle 1",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Slide 2",
      subtitle: "Subtitle 2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Slide 3",
      subtitle: "Subtitle 3",
    },
  ];
  return (
    <div>
      <Slideshow slides={slides} />
      <Slideshow slides={slides} />
      <Slideshow slides={slides} />
      <Slideshow slides={slides} />
      <Slideshow slides={slides} />
      <Slideshow slides={slides} />
    </div>
  );
}
