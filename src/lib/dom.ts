export function replaceChildren(parentNode: Element, newChild: Element) {
  if (parentNode.replaceChildren) {
    return parentNode.replaceChildren(newChild);
  }

  parentNode.innerHTML = '';
  parentNode.append(newChild);
}

export function lockBodyScroll(shouldLock: boolean) {
  const isClient = document && 'body' in document;
  if (!isClient) {
    return;
  }

  if (shouldLock) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}
