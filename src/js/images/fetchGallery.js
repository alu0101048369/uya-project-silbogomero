export default async function fetchGallery() {
  const response = await fetch(
    'https://firestore.googleapis.com/v1/projects/asociacionsilbogomero/databases/(default)/documents/gallery/all'
  );
  if (!response.ok) {
    return {
      list: null,
      error: `Error cargando elementos: (${response.status}) ${response.statusText}`,
    };
  }

  let raw;
  try {
    raw = await response.json();
  } catch (err) {
    return {
      list: null,
      error: `Error interpretando datos del servidor: ${err}`,
    };
  }

  const result = raw.fields.items.arrayValue.values.map((rawItem) => {
    const item = rawItem.mapValue.fields;
    return {
      title: item.title.stringValue,
      description: item.description.stringValue,
      image: item.image.stringValue,
    };
  });

  return {
    list: result,
    error: null,
  };
}
