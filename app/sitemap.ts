export default function sitemap() {
  const baseUrl = "https://nileet.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#resume`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
    },
  ];
}
