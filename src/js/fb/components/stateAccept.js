export default function stateAccept() {
  const div = document.createElement('div');
  div.innerHTML =
    '<div class="row"> <div class="col-12"> <div class="d-flex justify-content-center"> <div id="fb-loader" class="d-flex flex-column justify-content-center align-items-center border shadow-3"> <div class="spinner-border text-primary"> <span class="visually-hidden">Cargando...</span> </div><p id="fb-taking-too-long" class="text-primary m-3" style="display: none;"> Parece que tu navegador está bloqueando la carga de contenido de Facebook, o tu conexión es muy lenta. Inténtelo más tarde con otro navegador. </p></div><iframe id="fb-frame" hidden class="border shadow-3" src="about:blank" loading="lazy" style="border: none; overflow: hidden;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" ></iframe> </div></div></div>';
  return div.firstChild;
}
