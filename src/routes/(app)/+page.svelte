<script>
    import About from "@widgets/about/ui/About.svelte";
    import Hero from "@widgets/hero/ui/Hero.svelte";
    import Location from "@widgets/location/ui/Location.svelte";
    import Service from "@widgets/service/ui/Service.svelte";
    import Gallery from "@widgets/gallery/ui/Gallery.svelte";
    import Review from "@widgets/review/ui/Review.svelte";
    import Feedback from "@widgets/feedback/ui/Feedback.svelte";

    import { NAME } from "@shared/constants/title";

    export let data


</script>

<svelte:head>
  <!-- SEO -->
  <title>{data.mainPage.seo.title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/jpg" sizes="32x32" href="/favicon.jpg" />
  <link rel="icon" type="image/jpg" sizes="16x16" href="/favicon.jpg" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon.jpg" />
  <link rel="manifest" href="/site.webmanifest" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Региональность (для Яндекс и локального SEO) -->
  <meta name="geo.region" content="RU-KYA" /> <!-- RU-KYA = Красноярский край -->
  <meta name="geo.placename" content="Красноярск" />
  <meta name="geo.position" content="{data.mainPage.location.lat};{data.mainPage.location.long}" />
  <meta name="ICBM" content="{data.mainPage.location.lat}, {data.mainPage.location.long}" />
  <!-- Canonical -->
<link rel="canonical" href="https://getinbarber.ru/" />
  <meta
    name="description"
    content="{data.mainPage.seo.description}"
  />
  <meta
    name="keywords"
    content="{data.mainPage.seo.keywords}"
  />

  <!-- Open Graph -->
  <meta property="og:title" content="{data.mainPage.seo.title}" />
  <meta
    property="og:description"
    content="{data.mainPage.seo.description}"
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://getinbarber.ru/" />
  <meta property="og:image" content="/favicon.jpg" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{data.mainPage.seo.title}" />
  <meta
    name="twitter:description"
    content="{data.mainPage.seo.description}"
  />
  <meta name="twitter:image" content="/favicon.jpg" />
</svelte:head>


<Hero contacts={data.mainPage.medias} />
<Service services={data.mainPage.services}/>
<!-- <About /> -->
<Gallery gallery={data.mainPage.gallery}/>
<Location location={data.mainPage.location} contacts={data.mainPage.contacts} socialMedias={data.mainPage.medias} />
<!-- <Review /> -->
<Feedback form={data.feedbackForm}/>
