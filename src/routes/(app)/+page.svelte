<script>
    import About from "@widgets/about/ui/About.svelte";
    import Hero from "@widgets/hero/ui/Hero.svelte";
    import Location from "@widgets/location/ui/Location.svelte";
    import Service from "@widgets/service/ui/Service.svelte";
    import Gallery from "@widgets/gallery/ui/Gallery.svelte";
    import Review from "@widgets/review/ui/Review.svelte";
    import Feedback from "@widgets/feedback/ui/Feedback.svelte";

</script>

<svelte:head>
  <!-- SEO -->
  <title>Барбершоп Красноярск | Мужские стрижки и борода — ул. Лесников, 37Б</title>
  <meta
    name="description"
    content="Барбершоп в Красноярске (ул. Лесников, 37Б, 660006). Мужские стрижки, уход за бородой, бритьё. Записывайтесь онлайн или звоните!"
  />
  <meta
    name="keywords"
    content="барбершоп, стрижка, борода, Красноярск, район, адрес"
  />

  <!-- Open Graph -->
  <meta property="og:title" content="Барбершоп Красноярск — Мужские стрижки и борода" />
  <meta
    property="og:description"
    content="Барбершоп в Красноярске. Стрижки, уход за бородой и бритьё. Ул. Лесников, 37Б."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://example.com/" />
  <meta
    property="og:image"
    content="/hero-background.webp"
  />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Барбершоп Красноярск — Мужские стрижки и борода" />
  <meta
    name="twitter:description"
    content="Барбершоп в Красноярске. Стрижки, уход за бородой и бритьё. Ул. Лесников, 37Б."
  />
  <meta
    name="twitter:image"
    content="/hero-background.webp"
  />
</svelte:head>


<Hero />
<Service />
<!-- <About /> -->
<Gallery />
<Location />
<Review />
<Feedback />