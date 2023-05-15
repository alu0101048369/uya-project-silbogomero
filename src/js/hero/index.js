function iOS() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export default function hero() {
  if (iOS()) {
    document.getElementById('hero-bg').style.backgroundAttachment = 'scroll';
  }
}
