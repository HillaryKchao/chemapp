export const typeset = (selector: () => HTMLElement) => {
  const mathJax = (window as any).MathJax;
  // If MathJax script hasn't been loaded yet, then do nothing.

  if (!mathJax) {
    return null;
  }

  if (!mathJax.startup.promise) {
    return null;
  }

  mathJax.startup.promise = mathJax.startup.promise
    .then(() => {
      selector();
      return mathJax.typesetPromise();
    })
    .catch((err: any) => console.error(`Typeset failed: ${err.message}`));
  return mathJax.startup.promise;
};
