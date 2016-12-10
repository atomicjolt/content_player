export default function getAVSrc(target) {
  let src = target.src;

  if(src) {
    return src;
  } else {
    let source = target.querySelector("source");
    if(source) {
      src = source.src;
    }
  }

  return src;
}
