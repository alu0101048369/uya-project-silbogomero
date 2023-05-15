import fetchGallery from './fetchGallery';
import render from './render';

export default async function images() {
  render(await fetchGallery());
}
