<script>
    import About from "@widgets/about/ui/About.svelte";
    import Hero from "@widgets/hero/ui/Hero.svelte";
    import Location from "@widgets/location/ui/Location.svelte";
    import Service from "@widgets/service/ui/Service.svelte";
    import Gallery from "@widgets/gallery/ui/Gallery.svelte";
    import Review from "@widgets/review/ui/Review.svelte";
    import Feedback from "@widgets/feedback/ui/Feedback.svelte";

    import { NAME } from "@shared/constants/title";

</script>

<svelte:head>
  <!-- SEO -->
  <title>Барбершоп «{NAME}» в Красноярске | Мужские стрижки, борода и бритьё</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/jpg" sizes="32x32" href="/favicon.jpg" />
  <link rel="icon" type="image/jpg" sizes="16x16" href="/favicon.jpg" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.jpg" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta
    name="description"
    content="Барбершоп «{NAME}» в Красноярске (ул. Лесников, 27). Мужские стрижки, уход за бородой, бритьё. Онлайн-запись и звонки — без ожидания!"
  />
  <meta
    name="keywords"
    content="барбершоп {NAME}, стрижка Красноярск, барбершоп Красноярск, борода, бритьё, мужские стрижки"
  />

  <!-- Open Graph -->
  <meta property="og:title" content="Барбершоп «{NAME}» в Красноярске — мужские стрижки, борода и бритьё" />
  <meta
    property="og:description"
    content="Барбершоп «{NAME}» в Красноярске. Стрижки, уход за бородой и бритьё. Адрес: ул. Лесников, 27."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://getinbarber.ru/" />
  <meta property="og:image" content="/favicon.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Барбершоп «{NAME}» в Красноярске — мужские стрижки, борода и бритьё" />
  <meta
    name="twitter:description"
    content="Барбершоп «{NAME}» в Красноярске. Стрижки, уход за бородой и бритьё. Адрес: ул. Лесников, 27."
  />
  <meta name="twitter:image" content="/favicon.jpg" />
</svelte:head>


<Hero />
<Service />
<!-- <About /> -->
<Gallery />
<Location />
<Review />
<!-- <Feedback /> -->